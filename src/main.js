import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import request from './request'
import iView from 'iview';
import VueI18n from 'vue-i18n';
import en from 'iview/dist/locale/en-US';
import zh from 'iview/dist/locale/zh-CN';

Vue.use(VueI18n);
Vue.use(iView);

Vue.config.lang = 'en-US';
Vue.locale('en-US', en);
Vue.locale('zh-CN', zh);

Vue.config.productionTip = true;
Vue.use(request);

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app');
