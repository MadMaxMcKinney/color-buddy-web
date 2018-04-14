// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSvg from 'vue-svgicon'
import VueToast from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(VueSvg)
Vue.use(VueToast, {
	theme: "primary", 
	position: "bottom-right", 
	duration : 5000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
