import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import './theme/index.less'
Vue.use(Antd)
new Vue({
  el: '#app',
  render: h => h(App)
})
