/**
 * Created by feizheng on 3/27/17.
 */

// const env = '__BUILD_ENV__';
const env = 'test';
const CONFIG = require(`../configs/${env}`).default;

// console.log(`load config env=${env}...`, CONFIG);

export default class {
  static VESION = '__BUILD_VERSION__';
  static ENV = env;
  static WX_DEBUG = CONFIG.WX_DEBUG;
  static IMG_URL = CONFIG.IMG_URL;

  static API_WITH_TOKEN = {
    baseUrl: '/api/wp/pmall/',
    items: [
      'test1',
      'loginByPublic_100'
    ]
  };

  static API_WITHOUT_TOKEN = {
    baseUrl: '/api/wp/',
    items: [
      'setMyPhone_100'
    ]
  }
}



