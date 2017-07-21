import Vue from 'vue'
import App from './App'
import store from './store'
import filter from '@/store/filter.js'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.config.productionTip = false

String.prototype.format = function() {
	if (arguments.length == 0) return this;
	for (var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return s;
};

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
