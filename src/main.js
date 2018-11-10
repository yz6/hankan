import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import echarts from 'echarts'
import "echarts-gl"
import axios from 'axios'
require('es6-promise').polyfill();
import 'fetch-detector';
import 'fetch-ie8';

Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
        el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
