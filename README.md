# 基于 Github issues 的单页面博客

## 参考
[wuhaoworld - 基于 Github issues 的单页面静态博客](https://github.com/wuhaoworld/github-issues-blog)

我跟 wuhaoworld 同学的博客主要区别在于所使用的JS框架上

他使用 `ractive` 生成页面组件、`director` 来管理路由

而我则对应使用的是 `vue` 和 `vue-router`

## 依赖

- [vue-cli](https://github.com/vuejs/vue-cli)

  A simple CLI for scaffolding Vue.js projects.

- [vue](https://github.com/vuejs/vue)

  Vue.js（读音 /vjuː/, 类似于 view）是一个构建数据驱动的 web 界面的库。Vue.js 的目标是通过尽可能简单的 API 实现**响应的数据绑定**和**组合的视图组件**。

- [vue-router](https://github.com/vuejs/vue-router)

  vue-router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.

- [vue-resource](https://github.com/vuejs/vue-resource)

  The plugin for Vue.js provides services for making web requests and handle responses using a XMLHttpRequest or JSONP.

- [marked](https://github.com/chjj/marked)

  A full-featured markdown parser and compiler, written in JavaScript. Built for speed.

- [highlight.js](https://github.com/isagalaev/highlight.js)

  Highlight.js is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn’t depend on any framework and has automatic language detection.

## 注意

github api 在未认证（匿名访问）的情况是有限流机制的，就是说你在一定的时间内只能调用固定的次数，目前默认配额是 60 次请求。

如需认证提高 api 调用次数配额请参考 [wuhaoworld 同学写的教程](https://github.com/wuhaoworld/github-issues-blog#3-提高-api-访问次数的配额)

wuhaoworld 同学在 config.js 配置 access_token 的地方有段注释：

// access_token: 'abcde' + 'fghijk' // 请求量大时需要在 github 后台单独设置一个读取公开库的 token, 注意将token 拆成两个字符串，否则会被系统自动删除掉

没错，经过我多次试验如果 token 没有拆成两个字符串，调用 api 就会提示 401 错误。

**这里我还要再加上一点很容易被忽略的地方！！！**

打包工具（grunt、gulp、webpack）对 js 代码 uglify 之后 token 就没有再被拆成两个的字符串啦，而是一个完整的 token。

So... 我们这个项目就需要在 webpack build 之后再去把 dist 文件内 access_token 所在 js 文件内的值拆成两个字符串。

---

## vue-blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
