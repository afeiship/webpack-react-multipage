export default {
  "port": "3000",
  "proxy": {
    "/api": "http://120.27.13.225:80"
  },
  "vendors": [
    "next-js-core2",
    "next-react-redux",
    "classnames",
    "react-router",
    "react-router-dom"
  ],
  "development": {
    "entries": "src/modules/**/index.js",
    "publicPath": "/",
    "libs": {
      "react": "/node_modules//react/umd/react.development.js",
      "react-dom": "/node_modules/react-dom/umd/react-dom.development.js"
    }
  },
  "production": {
    "entries": "src/modules/**/index.js",
    "publicPath": "/app/",
    "libs": {
      "react": "//cdn.bootcss.com/react/16.4.0/umd/react.production.min.js",
      "react-dom": "//cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.production.min.js"
    }
  }
}