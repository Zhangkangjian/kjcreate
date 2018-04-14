import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ListTable from '@/components/ListTable'
import create from '@/components/create'
import createInfo from '@/components/createInfo'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Login',
		component: Login
	}, {
		path: '/Index',
		name: 'Index',
		component: Index,
		meta: {
			y: true,
			loginState: Boolean(sessionStorage.getItem('token'))
		},
		children: [{
		  name:'ListTable',
			path: '/Index/ListTable',
			component: ListTable
		}]
	}, {
		path: '/create',
		name: 'create',
		meta: {
			y: true,
			loginState: Boolean(sessionStorage.getItem('token'))
		},
		component: create
	}, {
		path: '/createInfo/:id',
		name: 'createInfo',
		meta: {
			y: true,
			loginState: Boolean(sessionStorage.getItem('token'))
		},
		component: createInfo
	}]
})