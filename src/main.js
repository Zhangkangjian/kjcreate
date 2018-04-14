// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import extend from './assets/extend.js'
import './../static/css/style.scss'

Vue.prototype.extend = extend

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if(to.meta.y){
  	if(extend.GetSession('token')){
  		next()
  	}else{
  		next('/')
  	}
  }else{
  	next()
  }
})