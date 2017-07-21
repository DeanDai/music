# music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

``` bash
注意⚠️:
	因为用了qq音乐api，它返回的script编码与页面的不一致，jQuery中有个方法scriptCharset可以处理这种情况，
	但是vue-resouce中没有，所以暂时修改了node_modules/vue-resource/dist/vue-resouce.es2015.js,
	使用户可以传递该参数来设置script标签的charset
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
