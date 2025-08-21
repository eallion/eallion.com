'use strict';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const ESA20240910 = require('@alicloud/esa20240910');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Credential = require('@alicloud/credentials');

class Client {

  /**
   * 使用凭据或 AK/SK 初始化账号 Client
   * @returns ESA20240910
   * @throws Exception
   */
  static createClient() {
    let config;

    // 检查是否提供了 AK/SK
    const accessKeyId = process.env['ACCESS_KEY_ID'];
    const accessKeySecret = process.env['ACCESS_KEY_SECRET'];

    if (accessKeyId && accessKeySecret) {
      // 使用 AK/SK 方式
      config = new OpenApi.Config({
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
      });
    } else {
      // 使用凭据方式
      let credential = new Credential();
      config = new OpenApi.Config({
        credential: credential,
      });
    }

    // Endpoint 请参考 https://api.aliyun.com/product/ESA
    config.endpoint = `esa.cn-hangzhou.aliyuncs.com`;
    return new ESA20240910.default(config);
  }

  static async main(args) {
    let client = Client.createClient();
    let purgeCachesRequest = new ESA20240910.PurgeCachesRequest({
      siteId: process.env['ESA_SITE_ID'],
      type: "purgeall",
      content: '{ "PurgeAll": true }'
    });
    let runtime = new Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      let resp = await client.purgeCachesWithOptions(purgeCachesRequest, runtime);
      console.log(JSON.stringify(resp, null, 2));
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      if (error.data && error.data["Recommend"]) {
        console.log(error.data["Recommend"]);
      }
    }
  }
}

exports.Client = Client;
Client.main(process.argv.slice(2));
