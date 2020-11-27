import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {vueInversifyPlugin} from "@vanroeybe/vue-inversify-plugin";
import container from "@/plugins/inversify";

Vue.config.productionTip = false
Vue.use(vueInversifyPlugin(container));

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
