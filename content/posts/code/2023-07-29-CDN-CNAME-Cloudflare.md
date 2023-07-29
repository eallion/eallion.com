---
title: "图床 CDN CNAME 接入 Cloudflare SaaS 实现分流"
authors: ["eallion"]
categories: ["代码"]
tags: 
  - hugo
  - blog
  - cname
  - cloudflare
slug: "cdn-cname-cloudflare"
draft: false
Comments: true
date: 2023-07-29T14:35:49+08:00
---

### TL;DR

本文比较长，也比较罗嗦，需要实现如下功能请再往下读：

- 域名 NS 不打算接入 Cloudflare
- 同一 CDN 域名，国内走国内流量，境外走 Cloudflare 流量
- 国内用阿里云、腾讯云等服务商的 CDN 和对象存储
- 境外用 Cloudflare 的 CDN
- 境外用 Cloudflare R2 或 Backblaze B2 作为存储桶

![](https://images.eallion.com/images/2023/07/cdn_dns.png)

### 前言

国内、境外分流，不光能削减成本，还能提高网站性能，优化 TTFB。

不记得是什么时候开始有了一个这样的闪念，然后就去搜索了一下。
结果发现网上的教程都比较老旧。其中讲得比较多的是通过 CloudFlare for SaaS 接入 CNAME，但是都支持普通的域名，并不能接入 R2 或者 Worker。

从功能的优先级上来说，我最需要的是分区解析功能，这就导致不能把域名的 NS 转入 Cloudflare。
Cloudflare 的 DNS 确实非常优秀，但 Cloudflare 不能分区解析，它有 CNAME 拉平功能，不过它会把所有中国大陆地区的 IP 解析到联通。
相反国内的 DNS 服务商的分区解析就做得好，可能也是因为国内的域名更需要这种功能吧。
无法全心全意付出，又想去贴贴 Cloudflare，那就只能搞些奇技淫巧。

2022 年 3 月份，CloudFlare 宣布更改了 CloudFlare for SaaS 的收费策略，每个账户可以有 100 个域名免费额度，而且超额后每个域名按 0.1 USD/月 收取费用。我们就利用 CloudFlare for SaaS 把域名通过 CNAME 接入 Cloudflare，享受 Cloudflare 强大的边缘计算能力。

对于小网站，比如本博客，以上服务都是免费的，免费额度：

- DNSPod：用的专业版，但免费版本也有分区解析
- 腾讯云 COS：50G/月；200万请求
- 腾讯云 CDN：10G/月
- Cloudflare CDN：正常使用无上限
- Cloudflare R2: 10G/月； 100万/1000万请求
- Backblaze B2: 10G/月； 与 Cloudflare 有 [流量联盟](https://www.backblaze.com/cloud-storage/integrations)

关于腾讯云的配置略过，这里只讲 Cloudflare 的部分。
前提需要 Cloudflare 账号中已经有一个可用的域名。
这个域名用来提供 `回退源` （Fallback Origin），假设这个域名是 `example.com` 。

### 创建 R2 并绑定自定义域名

1. 登录控制面板：<https://dash.cloudflare.com/> ，Cloudflare 已支持中文；
2. 创建 R2 存储桶的方法这里略过，如创建：`r2-blog-test`；
3. 在 `R2` `设置` `公开` `访问` `自定义域` `连接域` 为刚才创建的 R2 添加自定义域名：

![](https://images.eallion.com/images/2023/07/r2_custom_hostname.png)

然后该域名的 DNS 就会自动出现一条解析：

![](https://images.eallion.com/images/2023/07/custom_hostname_dns.png)

### 订阅 CloudFlare for SaaS

1. 在 `Zones` 中选择 `example.com` 这个域名；
2. 在该域名的 `SSL/TLS` 中选择 `自定义主机名`；
3. 选择 Enable 订阅。可以使用 Paypal 订阅。

![](https://images.eallion.com/images/2023/07/enable_cloudflare_saas.png)

### 添加自定义域名

订阅成功后，先添加 `回退源`：`images.example.com`，这个回源域名是绑定在 R2 上的自定义域名。

![](https://images.eallion.com/images/2023/07/cf_callback_hostname.png)

然后点击 `添加自定义主机名` ，填入 CDN 域名，如 `images.eallion.com` ，验证方式推荐 TXT 验证。

![](https://images.eallion.com/images/2023/07/add_custom_hostname.png)

添加后，需要验证域名，去自己的域名解析控制台，如 DNSPod ，添加 2 条 TXT 记录。
等待 `证书状态` 和 `主机名状态` 都变成 `有效`。

![](https://images.eallion.com/images/2023/07/cf_dns_txt_records.png)

### 解析 CNAME

`回退源状态` `证书状态` 和 `主机名状态` 都变成 `有效` 后，就去自己的域名解析控制台添加 CNAME 解析。
把用于生产环境的 `images.eallion.com` CNAME 指向 `images.example.com`。

![](https://images.eallion.com/images/2023/07/dns_cname_records.png)

一般的教程到这里就结束了。
但是这样是访问不了 R2 里面的资源的。
最重要的一步，用 Worker 代理 R2。

### 新建 Worker 代理 R2

官方有文档介绍怎么通过 Worker 访问 R2：
Use R2 from Workers：<https://developers.cloudflare.com/r2/api/workers/workers-api-usage/>

按照文档教程一步一步来就可以了。
如果比较懒，也不想鉴权。那用我的精简代码就可以了。
直接去掉了 `DELETE` 和 `PUT` 的代码，只保留了 `GET`。
不用 Wrangle CLI 脚本也可以在后台手动创建 Worker。

左侧切换到 `Worker 和 Pages` 分栏，`创建应用程序`，随便取个名字，随便选个模板部署就可以了，后面再改代码。

点击 `快速编译` 把以下代码复制到 `worker.js` 中，保存并部署：

```js
// src/worker.ts
var worker_default = {
  async fetch(request, env) {
    if (request.method !== "GET") {
      return new Response("Only GET method allowed", { status: 405 });
    }
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    const object = await env.MY_BUCKET.get(key);
    if (!object) {
      return new Response("Object not found", { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("ETag", object.httpEtag);
    return new Response(object.body, {
      headers
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
```

部署成功后返回。
在当前 Worker 的设置中，`变量` `R2 存储桶绑定` 添加绑定：

- `变量名称`：`MY_BUCKET`
- `R2 存储桶`：选择对应的桶

![](https://images.eallion.com/images/2023/07/r2_binding.png)

### Workers 路由

回到 Zones 中，选择域名，添加 Workers 路由：

- `路由`：一定要填生产环境用的域名，不要填 Cloudflare 的源域名，如：`images.eallion.com/*`；
- `Worker`：选择上一步创建的 Worker；
- `环境`：Production。

![](https://images.eallion.com/images/2023/07/r2_worker_router.png)

至此，你应该就能以 CNAME 的方式访问 Cloudflare R2 里面的内容了。

- <https://images.eallion.com/eallion.jpg>

### Worker 代理 Backblaze B2

其实有 R2 就够了，但是可能会因为各种各样的原因需要用到 B2。

其实是差不多的。

Backblaze 官方也有文档介绍如何通过 Cloudflare Worker 访问 B2。
Docs：[Integrate Cloudflare Workers with Backblaze B2](https://www.backblaze.com/docs/cloud-storage-integrate-cloudflare-workers-with-backblaze-b2)

简要介绍一下怎么做吧：（还是建议看官方文档比较好。）

##### 1、新建 Cloudflare Worker，`worker.js`

```js
(() => {
  // node_modules/aws4fetch/dist/aws4fetch.esm.mjs
  var encoder = new TextEncoder();
  var HOST_SERVICES = {
    appstream2: "appstream",
    cloudhsmv2: "cloudhsm",
    email: "ses",
    marketplace: "aws-marketplace",
    mobile: "AWSMobileHubService",
    pinpoint: "mobiletargeting",
    queue: "sqs",
    "git-codecommit": "codecommit",
    "mturk-requester-sandbox": "mturk-requester",
    "personalize-runtime": "personalize"
  };
  var UNSIGNABLE_HEADERS = /* @__PURE__ */ new Set([
    "authorization",
    "content-type",
    "content-length",
    "user-agent",
    "presigned-expires",
    "expect",
    "x-amzn-trace-id",
    "range",
    "connection"
  ]);
  var AwsClient = class {
    constructor({ accessKeyId, secretAccessKey, sessionToken, service, region, cache, retries, initRetryMs }) {
      if (accessKeyId == null)
        throw new TypeError("accessKeyId is a required option");
      if (secretAccessKey == null)
        throw new TypeError("secretAccessKey is a required option");
      this.accessKeyId = accessKeyId;
      this.secretAccessKey = secretAccessKey;
      this.sessionToken = sessionToken;
      this.service = service;
      this.region = region;
      this.cache = cache || /* @__PURE__ */ new Map();
      this.retries = retries != null ? retries : 10;
      this.initRetryMs = initRetryMs || 50;
    }
    async sign(input, init) {
      if (input instanceof Request) {
        const { method, url, headers, body } = input;
        init = Object.assign({ method, url, headers }, init);
        if (init.body == null && headers.has("Content-Type")) {
          init.body = body != null && headers.has("X-Amz-Content-Sha256") ? body : await input.clone().arrayBuffer();
        }
        input = url;
      }
      const signer = new AwsV4Signer(Object.assign({ url: input }, init, this, init && init.aws));
      const signed = Object.assign({}, init, await signer.sign());
      delete signed.aws;
      try {
        return new Request(signed.url.toString(), signed);
      } catch (e) {
        if (e instanceof TypeError) {
          return new Request(signed.url.toString(), Object.assign({ duplex: "half" }, signed));
        }
        throw e;
      }
    }
    async fetch(input, init) {
      for (let i = 0; i <= this.retries; i++) {
        const fetched = fetch(await this.sign(input, init));
        if (i === this.retries) {
          return fetched;
        }
        const res = await fetched;
        if (res.status < 500 && res.status !== 429) {
          return res;
        }
        await new Promise((resolve) => setTimeout(resolve, Math.random() * this.initRetryMs * Math.pow(2, i)));
      }
      throw new Error("An unknown error occurred, ensure retries is not negative");
    }
  };
  var AwsV4Signer = class {
    constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
      if (url == null)
        throw new TypeError("url is a required option");
      if (accessKeyId == null)
        throw new TypeError("accessKeyId is a required option");
      if (secretAccessKey == null)
        throw new TypeError("secretAccessKey is a required option");
      this.method = method || (body ? "POST" : "GET");
      this.url = new URL(url);
      this.headers = new Headers(headers || {});
      this.body = body;
      this.accessKeyId = accessKeyId;
      this.secretAccessKey = secretAccessKey;
      this.sessionToken = sessionToken;
      let guessedService, guessedRegion;
      if (!service || !region) {
        [guessedService, guessedRegion] = guessServiceRegion(this.url, this.headers);
      }
      this.service = service || guessedService || "";
      this.region = region || guessedRegion || "us-east-1";
      this.cache = cache || /* @__PURE__ */ new Map();
      this.datetime = datetime || new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
      this.signQuery = signQuery;
      this.appendSessionToken = appendSessionToken || this.service === "iotdevicegateway";
      this.headers.delete("Host");
      if (this.service === "s3" && !this.signQuery && !this.headers.has("X-Amz-Content-Sha256")) {
        this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
      }
      const params = this.signQuery ? this.url.searchParams : this.headers;
      params.set("X-Amz-Date", this.datetime);
      if (this.sessionToken && !this.appendSessionToken) {
        params.set("X-Amz-Security-Token", this.sessionToken);
      }
      this.signableHeaders = ["host", ...this.headers.keys()].filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header)).sort();
      this.signedHeaders = this.signableHeaders.join(";");
      this.canonicalHeaders = this.signableHeaders.map((header) => header + ":" + (header === "host" ? this.url.host : (this.headers.get(header) || "").replace(/\s+/g, " "))).join("\n");
      this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, "aws4_request"].join("/");
      if (this.signQuery) {
        if (this.service === "s3" && !params.has("X-Amz-Expires")) {
          params.set("X-Amz-Expires", "86400");
        }
        params.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
        params.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString);
        params.set("X-Amz-SignedHeaders", this.signedHeaders);
      }
      if (this.service === "s3") {
        try {
          this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "));
        } catch (e) {
          this.encodedPath = this.url.pathname;
        }
      } else {
        this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
      }
      if (!singleEncode) {
        this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/");
      }
      this.encodedPath = encodeRfc3986(this.encodedPath);
      const seenKeys = /* @__PURE__ */ new Set();
      this.encodedSearch = [...this.url.searchParams].filter(([k]) => {
        if (!k)
          return false;
        if (this.service === "s3") {
          if (seenKeys.has(k))
            return false;
          seenKeys.add(k);
        }
        return true;
      }).map((pair) => pair.map((p) => encodeRfc3986(encodeURIComponent(p)))).sort(([k1, v1], [k2, v2]) => k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0).map((pair) => pair.join("=")).join("&");
    }
    async sign() {
      if (this.signQuery) {
        this.url.searchParams.set("X-Amz-Signature", await this.signature());
        if (this.sessionToken && this.appendSessionToken) {
          this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken);
        }
      } else {
        this.headers.set("Authorization", await this.authHeader());
      }
      return {
        method: this.method,
        url: this.url,
        headers: this.headers,
        body: this.body
      };
    }
    async authHeader() {
      return [
        "AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString,
        "SignedHeaders=" + this.signedHeaders,
        "Signature=" + await this.signature()
      ].join(", ");
    }
    async signature() {
      const date = this.datetime.slice(0, 8);
      const cacheKey = [this.secretAccessKey, date, this.region, this.service].join();
      let kCredentials = this.cache.get(cacheKey);
      if (!kCredentials) {
        const kDate = await hmac("AWS4" + this.secretAccessKey, date);
        const kRegion = await hmac(kDate, this.region);
        const kService = await hmac(kRegion, this.service);
        kCredentials = await hmac(kService, "aws4_request");
        this.cache.set(cacheKey, kCredentials);
      }
      return buf2hex(await hmac(kCredentials, await this.stringToSign()));
    }
    async stringToSign() {
      return [
        "AWS4-HMAC-SHA256",
        this.datetime,
        this.credentialString,
        buf2hex(await hash(await this.canonicalString()))
      ].join("\n");
    }
    async canonicalString() {
      return [
        this.method.toUpperCase(),
        this.encodedPath,
        this.encodedSearch,
        this.canonicalHeaders + "\n",
        this.signedHeaders,
        await this.hexBodyHash()
      ].join("\n");
    }
    async hexBodyHash() {
      let hashHeader = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
      if (hashHeader == null) {
        if (this.body && typeof this.body !== "string" && !("byteLength" in this.body)) {
          throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
        }
        hashHeader = buf2hex(await hash(this.body || ""));
      }
      return hashHeader;
    }
  };
  async function hmac(key, string) {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      typeof key === "string" ? encoder.encode(key) : key,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(string));
  }
  async function hash(content) {
    return crypto.subtle.digest("SHA-256", typeof content === "string" ? encoder.encode(content) : content);
  }
  function buf2hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("0" + x.toString(16)).slice(-2)).join("");
  }
  function encodeRfc3986(urlEncodedStr) {
    return urlEncodedStr.replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
  }
  function guessServiceRegion(url, headers) {
    const { hostname, pathname } = url;
    if (hostname.endsWith(".r2.cloudflarestorage.com")) {
      return ["s3", "auto"];
    }
    if (hostname.endsWith(".backblazeb2.com")) {
      const match2 = hostname.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);
      return match2 != null ? ["s3", match2[1]] : ["", ""];
    }
    const match = hostname.replace("dualstack.", "").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);
    let [service, region] = (match || ["", ""]).slice(1, 3);
    if (region === "us-gov") {
      region = "us-gov-west-1";
    } else if (region === "s3" || region === "s3-accelerate") {
      region = "us-east-1";
      service = "s3";
    } else if (service === "iot") {
      if (hostname.startsWith("iot.")) {
        service = "execute-api";
      } else if (hostname.startsWith("data.jobs.iot.")) {
        service = "iot-jobs-data";
      } else {
        service = pathname === "/mqtt" ? "iotdevicegateway" : "iotdata";
      }
    } else if (service === "autoscaling") {
      const targetPrefix = (headers.get("X-Amz-Target") || "").split(".")[0];
      if (targetPrefix === "AnyScaleFrontendService") {
        service = "application-autoscaling";
      } else if (targetPrefix === "AnyScaleScalingPlannerFrontendService") {
        service = "autoscaling-plans";
      }
    } else if (region == null && service.startsWith("s3-")) {
      region = service.slice(3).replace(/^fips-|^external-1/, "");
      service = "s3";
    } else if (service.endsWith("-fips")) {
      service = service.slice(0, -5);
    } else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) {
      [service, region] = [region, service];
    }
    return [HOST_SERVICES[service] || service, region];
  }

  // index.js
  var UNSIGNABLE_HEADERS2 = [
    "x-forwarded-proto",
    "x-real-ip"
  ];
  function filterHeaders(headers) {
    return Array.from(headers.entries()).filter((pair) => !UNSIGNABLE_HEADERS2.includes(pair[0]) && !pair[0].startsWith("cf-"));
  }
  async function handleRequest(event, client2) {
    const request = event.request;
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed"
      });
    }
    const url = new URL(request.url);
    let path = url.pathname.replace(/^\//, "");
    path = path.replace(/\/$/, "");
    const pathSegments = path.split("/");
    if (ALLOW_LIST_BUCKET !== "true") {
      if (BUCKET_NAME === "$path" && pathSegments[0].length < 2 || BUCKET_NAME !== "$path" && path.length === 0) {
        return new Response(null, {
          status: 404,
          statusText: "Not Found"
        });
      }
    }
    switch (BUCKET_NAME) {
      case "$path":
        url.hostname = B2_ENDPOINT;
        break;
        break;
      case "$host":
        url.hostname = url.hostname.split(".")[0] + "." + B2_ENDPOINT;
        break;
      default:
        url.hostname = BUCKET_NAME + "." + B2_ENDPOINT;
        break;
    }
    const headers = filterHeaders(request.headers);
    const signedRequest = await client2.sign(url.toString(), {
      method: request.method,
      headers,
      body: request.body
    });
    return fetch(signedRequest);
  }
  var endpointRegex = /^s3\.([a-zA-Z0-9-]+)\.backblazeb2\.com$/;
  var [, aws_region] = B2_ENDPOINT.match(endpointRegex);
  var client = new AwsClient({
    "accessKeyId": B2_APPLICATION_KEY_ID,
    "secretAccessKey": B2_APPLICATION_KEY,
    "service": "s3",
    "region": aws_region
  });
  addEventListener("fetch", function(event) {
    event.respondWith(handleRequest(event, client));
  });
})();
//# sourceMappingURL=index.js.map
```

##### 2、设置 Worker 环境变量

- `ALLOW_LIST_BUCKET`：true
- `B2_APPLICATION_KEY`：K004WJZP11111111111111111111Q
- `B2_APPLICATION_KEY_ID`：0042e9999999920000000001
- `B2_ENDPOINT`：s3.us-west-004.backblazeb2.com
- `BUCKET_NAME`：eallion-static

APP KEY 和 ID 要去 Backblaze 后台生成，`B2_ENDPOINT` 要去自己的 B2 存储桶里查看。

##### 3、手动添加 CNAME 解析到 B2

![](https://images.eallion.com/images/2023/07/b2_cf_record.png)

- `类型`：选 `CNAME`
- `名称`：用于 `回退源`，如：`b2.example.com` ，就填入 `b2`
- `内容`：填入自己 B2 存储桶分配的 `S3 URL` ，有的教程这里写的是 `Friendly URL` ，没必要，还要多一步反代。

![](https://images.eallion.com/images/2023/07/backblaze_url.png)

##### 4、配置回退源

`Zones` 中的域名为 Backblaze B2 设置的 CNAME 名称是什么，那回退源就填什么，如：`b2.example.com`。
参考前文即可。

##### 5、配置自定义主机名

参考前文。

##### 6、配置 Worker 路由

- `路由`：一定要填生产环境用的域名，不要填 Cloudflare 的源域名；
- `Worker`：选择上一步创建的 Worker；
- `环境`：Production。

为 Backblaze B2 添加 Worker 路由与 Cloudflare R2 不同，需要添加 2 条：

- `b2.example.com/*` 也需要加入 Worker 路由中
- `images.eallion.com/*`

### 尾声

写长博客太折磨人了！主要是怕自己过一段时间会忘记怎么配置的，写个备忘录记录一下。
