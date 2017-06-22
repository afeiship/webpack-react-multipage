/**
 * Created by feizheng on 3/27/17.
 */

const env = nx.hashlize().env || 'test';
const CONFIG = require(`../configs/${env}`).default;

// console.log(`load config env=${env}...`, CONFIG);

export default class {
  static WX_DEBUG = CONFIG.WX_DEBUG;
  static IMG_URL = CONFIG.IMG_URL;

  
  static API_WITH_TOKEN = {
    baseUrl: '/weipai/i/wp/pmall/',
    items: [
      'test1',
      'loginByPublic_100'
    ]
  };

  static API_WITHOUT_TOKEN = {
    baseUrl: '/weipai/i/wp/',
    items: [
      'setMyPhone_100'
    ]
  }
}



