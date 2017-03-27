import nx from 'next-js-core2';
import nxAxios from 'next-axios';

const WeiPaiHttp = nx.declare({
  extend: nxAxios,
  instance: null,
  statics: {
    getInstance: function () {
      if (!WeiPaiHttp.instance) {
        WeiPaiHttp.instance = new WeiPaiHttp();
      }
      return WeiPaiHttp.instance;
    }
  },
  methods: {
    init: function () {
      this.base();
      this.setHeaders({
        common: {
          'Client-ABC': 'H5-fei'
        }
      })
    },
    toData: function (inResponse) {
      return inResponse.data;
    }
  }
});

export default  http = WeiPaiHttp.getInstance();



