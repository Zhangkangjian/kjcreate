const url = 'https://www.fantiansmart.com'
import ys from '../assets/extend.js'
try{
	var saId = ys.GetSession('token').saId
	var token = ys.GetSession('token').token
}catch(e){
	//TODO handle the exception
}
var uuid = ys.uuid()
console.log(token)
export default {
	Login:function(info){
		return $.post(url+'/restful/wechatApplet/loginByAccount',{phoneNum:info.username,password:info.password})
	},
	getList:function(num){
		return $.post(url+'/restful/Sample/getSampleByPageNumber',{
			saId: saId,
			uuid: uuid,
	        sign: ys.SHA256(uuid+token),
	        accessSaId: saId,
	        pageNumber: num,
	        isRelease: 0
		})
	},
	getSampleDetail:function(info){
		return $.post(url+'/restful/Sample/getSampleDetail',{
			saId: saId,
	        uuid: uuid,
	        sign: ys.SHA256(uuid+token),
	        sampleMasterId: info.said,
	        isRelease:info.Release,
	        sharesource:null,
	        sampleId:null,
	        shareSaId:null
		})
	},
	getUploadFileInformation:function(info){
		var types = info.type
		var str = {
			[types]:"1"
		}
		return $.post(url+'/restful/util/getUploadFileInformation',{
			saId: saId,
	        uuid: uuid,
	        sign: ys.SHA256(uuid+token),
			correlationTypeId:'51',
			extensioName:JSON.stringify(str)
		})
	},
	savePage:function(info){
		return $.post(url+'/restful/Sample/addSample',{
			saId: saId,
	        uuid: uuid,
	        sign: ys.SHA256(uuid+token),
			sampleContentJsonString:info.Json,
			sampleMasterId:info.sampleMasterId?info.sampleMasterId:null,
			sampleId:info.sampleId?info.sampleId:null
		})
	},
	Delete:function(num){
		return $.post(url+'/restful/Sample/delSample',{
			saId: saId,
	        uuid: uuid,
	        sign: ys.SHA256(uuid+token),
	        sampleMasterId:num.id,
	        isRelease:num.r
		})
	}
}
