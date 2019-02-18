import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import request from './request'
import iView from 'iview';
import VueI18n from 'vue-i18n';
import iViewEn from 'iview/dist/locale/en-US';
import iViewZh from 'iview/dist/locale/zh-CN';
import {default as en} from './lang/en.js'
import {default as zh} from './lang/zh.js'

// Vue.use(VueI18n);
// Vue.use(iView);
//
// Vue.config.lang = 'en-US';
// Vue.locale('en-US', en);
// Vue.locale('zh-CN', zh);
//
// Vue.config.productionTip = true;
// Vue.use(request);
//
// new Vue({
//   render: h => h(App),
//   router:router
// }).$mount('#app');

Vue.use(request);

Vue.use(VueI18n);
Vue.use(iView, {
    i18n: function(path, options) {
        let value = i18n.t(path, options)
        if (value !== null && value !== undefined) {
            return value
        }
        return ''
    }
});
Vue.locale = () => {};

const messages = {
    en: Object.assign(en, iViewEn),
    zh: Object.assign(zh, iViewZh)
};

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'zh',  // set locale
    messages  // set locale messages
});
iView.i18n((key, value) => i18n.t(key, value))
new Vue({
    i18n,
    render: h => h(App),
    router:router
}).$mount('#app');
