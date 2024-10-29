'use strict';
// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const OpenApi = require('@alicloud/openapi-client');
const Console = require('@alicloud/tea-console');
const OpenApiUtil = require('@alicloud/openapi-util');
const Util = require('@alicloud/tea-util');
const Tea = require('@alicloud/tea-typescript');

class Client {

  /**
   * 使用 AK&SK 初始化账号 Client
   * @return Client
   * @throws Exception
   */
  static createClient() {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ACCESS_KEY_ID
      accessKeyId: process.env['ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ACCESS_KEY_SECRET
      accessKeySecret: process.env['ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/ESA
    config.endpoint = `esa.cn-hangzhou.aliyuncs.com`;
    return new OpenApi.default(config);
  }

  /**
   * API 相关
   * @param path string Path parameters
   * @return OpenApi.Params
   */
  static createApiInfo() {
    let params = new OpenApi.Params({
      // 接口名称
      action: 'PurgeCaches',
      // 接口版本
      version: '2024-09-10',
      // 接口协议
      protocol: 'HTTPS',
      // 接口 HTTP 方法
      method: 'POST',
      authType: 'AK',
      style: 'RPC',
      // 接口 PATH
      pathname: `/`,
      // 接口请求体内容格式
      reqBodyType: 'json',
      // 接口响应体内容格式
      bodyType: 'json',
    });
    return params;
  }

  static async main(args) {
    let client = Client.createClient();
    let params = Client.createApiInfo();
    // query params
    let queries = { };
    queries['SiteId'] = process.env['ESA_SITE_ID'];
    queries['Type'] = 'directory';
    queries['Content'] = '{"Directories":["https://www.eallion.com/"]}';
    // runtime options
    let runtime = new Util.RuntimeOptions({ });
    let request = new OpenApi.OpenApiRequest({
      query: OpenApiUtil.default.query(queries),
    });
    // 复制代码运行请自行打印 API 的返回值
    // 返回值实际为 Map 类型，可从 Map 中获得三类数据：响应体 body、响应头 headers、HTTP 返回的状态码 statusCode。
    let resp = await client.callApi(params, request, runtime);
    Console.default.log(Util.default.toJSONString(resp));
  }

}

exports.Client = Client;
Client.main(process.argv.slice(2));
