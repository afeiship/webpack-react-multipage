# webpack-react-multipage
> React multipage app based on webpack.

## for react warning...
```js
//Some development js package need this one.
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
})
```

## todos:
- [x] cdn for react/react-dom
- [ ] local fonts/images support.
- [x] dev-dll/prod-dll files.
- [ ] css image sprite
- [x] ejs -> jade/pug with jade mixin/extend and etc.
- [ ] move config to Package.json->config key.


## resource:
+ http://blog.csdn.net/fengyinchao/article/details/52100357
+ https://robertknight.github.io/posts/webpack-dll-plugins/
+ https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.byfy3mdfi
+ https://juejin.im/entry/57a6dee4a633bd00604d0e73
+ https://segmentfault.com/a/1190000007891318
+ [sass-importer]:https://github.com/Aintaer/import-glob-loader
+ http://www.css88.com/doc/webpack2/plugins/html-webpack-plugin/
+ http://www.cnblogs.com/chenziyu-blog/p/5675086.html
+ http://stackoverflow.com/questions/33820139/module-build-failed-referenceerror-babel
+ http://blog.csdn.net/github_26672553/article/details/52280655
+ http://www.cnblogs.com/-simon/p/5947092.html

## about html-webpack-plugin:
+ http://www.cnblogs.com/wonyun/p/6030090.html
+ http://www.cnblogs.com/haogj/p/5160821.html

## pug(jade) support
+ https://github.com/negibouze/html-webpack-pug-plugin
+ https://github.com/pugjs/pug
+ https://github.com/pugjs/pug-loader
