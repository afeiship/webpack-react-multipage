module.exports = {
  port: "3000",
  proxy: {
    "/api": {
      target: "http://120.27.13.225:80",
      changeOrigin: true
    }
  },
  vendors: [
    "@feizheng/next-js-core2",
    "@feizheng/next-react-redux",
    "classnames",
    "react-router",
    "react-router-dom"
  ],
  local: {
    entries: "src/modules/**/index.js",
    publicPath: "/",
    libs: {
      react: "/react/umd/react.development.js",
      reactDom: "/react-dom/umd/react-dom.development.js"
    }
  },
  development: {
    entries: "src/modules/**/index.js",
    publicPath: "/app/",
    libs: {
      react: "//cdn.bootcss.com/react/16.4.0/umd/react.production.min.js",
      reactDom: "//cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.production.min.js"
    }
  },
  production: {
    entries: "src/modules/**/index.js",
    publicPath: "/app/",
    libs: {
      react: "//cdn.bootcss.com/react/16.4.0/umd/react.production.min.js",
      reactDom: "//cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.production.min.js"
    }
  }
};
