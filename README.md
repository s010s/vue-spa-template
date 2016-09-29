# vue-spa-template


###应用到的框架与库

vue:

https://github.com/vuejs/vue

https://cn.vuejs.org/

webpack:

https://webpack.github.io/

http://www.jianshu.com/p/b95bbcfc590d

vue-router:

https://github.com/vuejs/vue-router

http://www.cnblogs.com/keepfool/p/5690366.html

https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn

vux:

https://github.com/airyland/vux

vuex(暂缺demo):

https://github.com/vuejs/vuex/tree/1.0/docs/zh-cn

gulp:

https://github.com/gulpjs/gulp

hammer:

https://hammerjs.github.io/

cordova(仅用于兜兜移动端，可不引入)

eking(仅用于兜兜移动端，可不引入)

doudou(仅用于兜兜移动端，可不引入)


###安装配置与使用

git clone https://github.com/s010s/vue-spa-template.git

npm install

####本地调试：
npm run dev

####发布到指定端口调试(package.json中修改，默认9000)：
npm run ip

####发布：

windows:

npm run wb

mac os:

npm run mb

####打包压缩

gulp

```

输入项目名（gulpfile.js中可设置默认项目名）
选择正式或测试版本
输入版本号
打包压缩到pkg/正式|测试/

```