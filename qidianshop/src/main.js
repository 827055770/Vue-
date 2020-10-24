// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
//注册全局组件
Vue.component(Button.name, Button);
//使用图片的懒加载
Vue.use(VueLazyload,{
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
