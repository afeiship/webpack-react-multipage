import Config from './config';
import Http from './http';
import Mock   from  './mock';
import Q from 'q';

export default nx.declare({
  statics: {
    $mock: new Mock(),// add by clark
    all(apis){
      return Q.all(apis);
    },
    init () {
      this.apiWithoutToken();
      this.apiWithToken();
    },
    apiWithoutToken () {
      let Apis = Config.API_WITHOUT_TOKEN;
      Apis.items.forEach((item) => {
        this[item] = function (inData) {
          return Http.post(`${Apis.baseUrl}${item}`, inData);
        };
      });
    },
    apiWithToken(){
      let Apis = Config.API_WITH_TOKEN;
      Apis.items.forEach((item) => {
        this[item] = (inData) => {
          return Http.post(`${Apis.baseUrl}${item}`, inData);
        };
      });
    }
  }
});
