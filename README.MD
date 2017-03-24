#webpack-react-multipage
> React multipage app based on webpack.

## resouces:
+ http://www.cnblogs.com/chenziyu-blog/p/5675086.html
+ http://stackoverflow.com/questions/33820139/module-build-failed-referenceerror-babel
+ http://blog.csdn.net/github_26672553/article/details/52280655
+ http://www.cnblogs.com/-simon/p/5947092.html

## list files:
```bash
du -hs *
```

## for react warning...
```js
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development')
  }
})
```

## todos:
- [x] cdn for react/react-dom
- [ ] local fonts/images support.


## resource:
+ http://blog.csdn.net/fengyinchao/article/details/52100357
+ http://blog.csdn.net/fengyinchao/article/details/52100357
