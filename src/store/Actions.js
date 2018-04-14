import * as types from './types.js'
import api from '../api'
import OSS from 'ali-oss'
import co from 'co'
var index = 0,mo=0
export default {
	setOssInfo: function({commit,state}, info) {
		$.ajax({
			type: "post",
			url: "https://www.fantiansmart.net/restful/util/getFederationToken",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			data: {
				uuid: '1',
				saId: '1',
				sign: '1',
				purviewType: info.num
			},
			success: function(res) {
				var client = new OSS.Wrapper({
					accessKeyId: res.accessKeyId,
					accessKeySecret: res.accessKeySecret,
					stsToken: res.securityToken,
					endpoint: 'oss-cn-beijing.aliyuncs.com',
					bucket: 'mep-sample'
				});

				info.callback(client)
			},
			error: function(err) {
				console.log('获取oss权限失败：'+err)
			}
		});
	},
	Login:function({commit,state},info){
		var self = this
		self.dispatch('loading',true)
		api.Login({
			username:info.username,
			password:info.password,
		}).success(res=>{
			self.dispatch('loading',false)
			info.callback(res)
		}).error(err=>{
			self.dispatch('loading',false)
			console.log(err)
		})
	},
	setList: function({commit,state},num) {
		var self = this
		self.dispatch('loading',true)
		api.getList(num).success(res => {
			self.dispatch('loading',false)
			console.log(res.sampleListVo)
			res.retCode == 200 ? commit('SAMPLELISTVO', res.sampleListVo) : console.log(res)
		}).error(err => {
			self.dispatch('loading',false)
			$.Toast({title:'列表数据读取错误'})			
			console.log(err)
		})
	},	
	addPages: function({commit,state}, info) {
		var colId = 'sequence'
		var desc = function(x, y) { return(x.samplePage[colId] < y.samplePage[colId]) ? 1 : -1 }
		try{
			index = state.sample.sampleArray.samplePageList[info.index].samplePageGroupList.sort(desc)[0].sequence
		}catch(e){}
		var base,b
		if(info.num) { //1 页面			
			index = index+1
			b = true
			base = {
				samplePage: {
					isSection: info.num,
					samplePageName: info.name,
					sequence:''
				},
				samplePageGroupList:[]//内容
			}
			console.log(base.samplePage)
		} else { //0 模块
			b = false
			try{
				index = state.sample.sampleArray.samplePageList[info.index].samplePageGroupList.sort(desc)[0].sequence
			}catch(e){}			
			base = {
				samplePage: {
					isSection:info.num,
					samplePageName:info.name,
					sequence:''//info.seq
				}
			}
			console.log(base.samplePage)
		}
		commit('ADDPAGES', {info: base,eq: info.index,push:b})
	},	
	modelState: function({commit,state}, info) {
		commit('MODELSTATE', info)
	},
	removeList:function({commit,state},num){
		commit('REMOVELIST', num)
	},
	uploadfile:function({commit,state},info){
		var data = 'PICTURE'
		var self = this
		if(info.types=='mp4'||info.types=='ogg'){data = 'VIDEO'}
		api.getUploadFileInformation({//重命名接口
			type:info.types
		}).success(res=>{			
			var fileName = res.fileNameMap[info.types][0],p=0
			self.dispatch('setOssInfo',{
				num:'2',
				callback:function(client){
					co(function* () {
					  var result = yield client.multipartUpload(fileName, info.files,{
					  	progress: function* (p) {
					      info.progress(parseFloat(p*100))
					    }
					  });
					  
					  self.dispatch('setOssInfo',{
					  	num:'1',
					  	callback:function(ce){
					  		if(data=='PICTURE'){
					  			var s = ce.signatureUrl(result.name,{expires: 3600,process: "style/detail"})
					  			info.callback({
						  			mediaType:data,
						  			galleryUrl:result.name,
						  			NewgalleryUrl:s
						  		})
					  		}else{
					  			self.dispatch('modelState',true)
					  			state.mutations.cureImage = ''
					  			state.mutations.curetxt = 0
					  			var s = ce.signatureUrl(result.name,{
						  			expires: 3600,
									process: "video/snapshot,t_0,f_jpg,w_400,h_225"
						  		})
					  			info.callback({
						  			mediaType:data,
						  			galleryUrl:result.name,
						  			NewgalleryUrl:s
						  		})
					  			state.mutations.cureImage = s
					  			console.log(s)
					  		}
					  	}
					  })
					  
					}).catch(function (err) {
					  console.log(err);
					});
				}
			})
			
		}).error(err=>{
			console.log(err)
		})
	},
	setSampleDetail:function({commit,state},info){
		var self = this
		self.dispatch('loading',true)
		api.getSampleDetail({
			said:info.said,
			Release:info.Release
		}).success(res=>{
			self.dispatch('loading',false)
			if(res.retCode==200){
				var colId = 'sequence'
				var desc = function(x, y) { return(x.samplePage[colId] < y.samplePage[colId]) ? 1 : -1 }
				info.callback(JSON.parse(res.sampleContentJsonString).samplePageList.sort(desc)[0].samplePage.sequence)
				commit('SAMPLEDETAILl',JSON.parse(res.sampleContentJsonString)?JSON.parse(res.sampleContentJsonString):null)
			}else{
				console.log(res)
			}
		}).error(err=>{
			self.dispatch('loading',false)
			console.log(err)
		})
	},
	savePage:function({commit,state},info){
		var self = this
		self.dispatch('loading',true)
		api.savePage(info).success(res=>{
			self.dispatch('loading',false)
			console.log(res)//成功
		}).error(err=>{
			self.dispatch('loading',false)
			console.log(err)//失败
		})
	},
	previewShow:function({commit,state},info){
		state.mutations.previewShow = info
	},
	loading:function({commit,state},info){
		state.mutations.loading = info
	},
	Delete:function({commit,state},info){
		var self = this
		self.dispatch('loading',true)
		api.Delete({
			id:info.id,
			r:info.r
		}).success(res=>{
			self.dispatch('setList',info.r)
		}).error(err=>{
			console.log(err)
		})
	},
	createInfoState:function({commit,state},info){
		state.mutations.infoIF = info
	}
}