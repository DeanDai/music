import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: require('@/views/Home')
	}, {
		path: '/song/:id',
		name: 'Song',
		component: require('@/views/Song')
	}]
})

router.beforeEach((to, from, next) => {
	console.log(router)
	next();
})

export default router 