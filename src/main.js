// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './style/reset.css';
import Vue from 'vue';

import VueRouter from 'vue-router';
import App from './App';
import routes from './router';

// store为实例化生成的
import store from './store';

import Sto from 'store';

import axios from "axios";


// import { Message, loading } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$loading = ElementUI.Loading;
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.$sto = Sto;
Vue.prototype.$store = store;

Vue.config.productionTip = false

// 创建路由实例
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  strict: process.env.NODE_ENV === 'development' // 生产环境使用严格模式
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const exp = sessionStorage.getItem('token-expired')
  const now = new Date().getTime()
  if (to.path === '/login') {
    if (token && exp && (now - exp < 30000)) {
      next("/")
    } else {
      next()
    }
  } else {
    // token每过3小时需刷新一次
    if (token && exp && (now - exp < 10800000)) {
      next()
    } else {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('token-expired')
      next('/login')
    }
  }
})


window.$config = {};

//dev

window.$config.HOST = 'http://192.168.1.180:8080'
window.$config.HOST2 = 'http://192.168.1.180:8001/uaa';

//dev
// window.$config.HOST = 'http://192.168.1.159:8080'
// window.$config.HOST2 = 'http://192.168.1.159:8080/uaa';

// production
// window.$config.HOST = 'http://202.120.1.66:8080/planservice'
// window.$config.HOST2 = 'http://202.120.1.66:8080/service-authorization/uaa';
// window.$config.HOST3 = 'http://202.120.1.66:8080' 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})