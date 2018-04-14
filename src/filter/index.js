import Vue from 'vue'
import OSS from 'ali-oss'
Vue.filter('trim', function(value) {
	var strVal = $.trim(value)
	return strVal
})

Vue.filter('GalleryUrl',function(value,fm){
	return fm
})

Vue.filter('client',function(value,client,mp4){
	if(value&&client){
		try{
			var m
			if(value.split('.')[1]=='mp4'){
				var z = mp4?mp4:0
				m = client.signatureUrl(value,{
					expires: 3600,
					process: "video/snapshot,t_"+z+",f_jpg,w_400,h_225"
				})
			}else{
				m = client.signatureUrl(value,{
					expires: 3600,
					process: "style/detail"
				})
			}
			
			return m
		}catch(e){
			console.log(e)
			//TODO handle the exception
		}		
	}
	
})