import Vue from 'vue'
import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
