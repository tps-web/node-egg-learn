/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // 数据库配置
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'blog',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };
 //关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:9528' ],
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592896589397_3857';
 
  config.jwt = {
    secret: '123456',
  };

  // add your middleware config here
  config.middleware = [];
  
 // 跨域配置
  config.cors = {
      origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  
  config.uploadDir = 'app/public/admin/upload';


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
