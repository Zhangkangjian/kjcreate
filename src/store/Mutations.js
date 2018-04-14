import * as types from './types.js'

const state = {
	cureImage:'',
	infoIF:false,
	loading:false,
	curetxt:0,
	model:false,
	previewShow:false,
	sampleList:[]
}
const getters = {
	data:function(state){
		return state
	}
}
const mutations = {
	[types.SAMPLELISTVO](state,info){
		state.sampleList = info
	},
	[types.MODELSTATE](state,info){
		state.model = info
	}
}

export default {
	state,
	getters,
	mutations
}
