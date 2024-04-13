---
title: "NeoDB 获取 Access Token"
authors: ["eallion"]
categories: ["代码"]
tags: 
  - hugo
  - blog
  - NeoDB
  - Token
slug: "neodb_token"
summary: "这篇文章介绍了如何获取NeoDB的Access Token。首先需要注册NeoDB和Mastodon账号，并登录NeoDB。然后进入NeoDB的开发者中心，创建一个应用并获取AUTH_CODE。最后，通过发送请求，可以获取到有效期为1年的Access Token。"
series: ["NeoDB"]
series_weight: 2
seriesNavigation: true
draft: false
date: 2023-07-11T23:15:21+08:00
---

### 1. 注册 Neodb 账号

注册 NeoDB 账号前，需要注册一个 Mastodon 长毛象宇宙的账号，有很多实例可以注册。然后用 Mastodon 账号就可以登录 NeoDB 了。最新的 NeoDB 似乎已经可以绑定邮箱登录了。
注册 Mastodon 和 NeoDB 这些都是小事情，暂时略过，默认任何人都会了。
比如我就注册在 [mastodon.social](https://mastodon.social/@eallion) ，我以前还自建过 Mastodon，不过没必要。

### 2. 生成 NeoDB 的 Token

NeoDB 官方开发者中心有 [How to authorize](https://neodb.social/developer/) 教程，按教程一步一步来就可以。
但是有人问到，我这里就翻译一下。
为什么要生成 Access Token，因为临时的 Test Token 有效期很短。

#### 2.1. 进入开发者中心

- [https://neodb.social/developer/](https://neodb.social/developer/)

#### 2.2. 新建一个应用

点击 `Your applications`，再点击 `New Application`，然后的按下面的例子填入信息。

- `Name`：随便起个名字，尽量写英文
- `Url`：一定要填自己的可以访问的域名
- `Description`：随便写
- `Client secret`：自动生成的，不要修改，一定要记下来，不过这个后期编辑的时候还能看到
- `Redirect uris`：在填入的 Url 基础上加上 `/callback`

创建成功后，就能看到此应用的 `Client ID`，记录下此 `Client ID`。

![](/assets/images/posts/2023/07/creat_app.png)

#### 2.3. 获取 `AUTH_CODE`

通过浏览器访问下面的 URL，注意修改成自己的参数：

```
https://neodb.social/auth/oauth/authorize/?response_type=code&client_id=CLIENT_ID&redirect_uri=https://example.org/callback
```

其中：

- `CLIENT_ID`：替换成应用的 Clinet ID：`uT9mDhCHc5sdfsfsdfsfsfsdsdfS1JVW3dLyAm`
- `redirect_uri`：替换成应用中填写的：`https://eallion.com/callback`

替换后的 URL 应该像这样：

![](/assets/images/posts/2023/07/authorize.png)

访问后，点击 `确认授权` ，会在浏览器地址栏返回一个带有 `code` 的 URL。记住这个 `code` 的值，别管 404 或其他报错。

![](/assets/images/posts/2023/07/code.png)

#### 2.4 最终获取 `Access Token`

最后一步，打开终端、WSL、VPS或者 Postman 这类工具，发送如下的请求，就能返回 `Access Token` 的值了。

```
    curl -X POST https://neodb.social/oauth/token/ \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "client_id=uT9mDhCHc5sdfsfsdfsfsfsdsdfS1JVW3dLyAm" \
    -d "client_secret=BMYR8144KWQEus0cPQRsE2EOZEkGfsDH34234234222222kA8XDL7wd1sgpDybvxMhvEyDUU5V0evZd8gKWhL2" \
    -d "code=pjFoZSzmFusdfsdfsfsdfsfsdfsfsdfs4FxxwDxZzt7ePSt46INN" \
    -d "redirect_uri=https://eallion.com/callback" \
    -d "grant_type=authorization_code"
```

然后你就会得到一串字符串：

```
{"access_token": "QuhZZpr8bE711111111111X2OPaSRKU", "expires_in": 31536000, "token_type": "Bearer", "scope": "read write", "refresh_token": "j35doBOi22222222229Z2rLVVKX"}
```

`QuhZZpr8bE711111111111X2OPaSRKU` 就是一个有效期 1 年的 `Access Token` 了。
