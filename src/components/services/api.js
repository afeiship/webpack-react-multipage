import http from './http';


let Api = {};


const api_without_token = {
  baseUrl: '/interface/helper/pmall/',
  items: [
    'api_test1',
    'api_test2',
    'api_test3',
  ]
};

const api_with_token = {
  baseUrl: '/interface/helper/',
  items: [
    'api_demo1',
    'api_demo2',
    'api_demo3',
  ]
};


api_without_token.items.forEach((item) => {
  Api[item] = function () {
    return http.post(`${api_without_token.baseUrl}${item}`)
  };
});


api_with_token.items.forEach((item) => {
  Api[item] = () => {
    return http.post(`${api_with_token.baseUrl}${item}`)
  };
});


export default Api;
