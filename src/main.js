import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import request from './request'
import iView from 'iview';
import VueI18n from 'vue-i18n';
import en from 'iview/dist/locale/en-US';

Vue.use(VueI18n);
Vue.use(iView);
Vue.locale = () => {};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',  // set locale
  messages:{en}  // set locale messages
});


Vue.config.productionTip = true;
Vue.use(request);

new Vue({
  i18n,
  render: h => h(App),
  router:router
}).$mount('#app');
