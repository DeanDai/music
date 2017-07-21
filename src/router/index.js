import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: require('@/views/Home')
	}, {
		path: '/song',
		name: 'Song',
		component: require('@/views/Song')
	}]
})