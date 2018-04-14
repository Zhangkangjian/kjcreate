import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/*----------------------------------*/
import mutations from './Mutations.js'
import sample from './sample.js'

import actions from './Actions.js'

export default new Vuex.Store({
	modules:{
		mutations,
		sample
	},	
	actions	
})
