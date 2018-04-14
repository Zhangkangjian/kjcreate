import * as types from './types.js'

const state = {	
	sampleArray: {
		"sample": {
			"sampleName": "",
			"companyName": "",
			"isDisplaySampleName": 0,
			"coverGalleryUrl": "cover/01.png",
			"NewcoverGalleryUrl":''
		},
		"samplePageList": []
	}
}
const getters = {
	getsampleArray:function(state){
		return state
	}
}
const mutations = {
	[types.ADDPAGES](state,info){
		var t = 1
		function nexts(){
			if(state.sampleArray.samplePageList[info.eq+t]){
				if(state.sampleArray.samplePageList[info.eq+t].samplePage.isSection){
					++t
					nexts()
				}else{					
					info.push?state.sampleArray.samplePageList.splice(info.eq+t, 0, info.info):state.sampleArray.samplePageList.push(info.info)
				}
			}else{
				info.push?state.sampleArray.samplePageList.splice(info.eq+t, 0, info.info):state.sampleArray.samplePageList.push(info.info)
			}
		}
		nexts()
	},
	[types.REMOVELIST](state,num){
		state.sampleArray.samplePageList.splice(num,1);
	},
	[types.SAMPLEDETAILl](state,info){
		var colId = 'sequence'
		var desc = function(x, y) { return(x.samplePage[colId] < y.samplePage[colId]) ? -1 : 1 }
		state.sampleArray = info
	}
}

export default {
	state,
	getters,
	mutations
}
