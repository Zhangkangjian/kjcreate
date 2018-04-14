<template>
	<div class="previewbg">
		<div class="iphoneBox">
			<div class="pagewrap">
				<div class="pageCont" :style="styleObject">
					<div class="page" v-for="(v,i) in preview" v-if="v.samplePage.isSection==1">
						<div class="fengmian" v-if='i==1&&fengmian==true'>
							<img :src="getsampleArray.sampleArray.sample.NewcoverGalleryUrl | GalleryUrl(createFMImage)">
							<div class="fengmian_bot">{{getsampleArray.sampleArray.sample.companyName}}</div>
						</div>
						<div class="wrap" v-for="(item,index) in v.samplePageGroupList">					
							<div class="previewTitle" v-if="item.samplePageGroup.samplePageGroupTypeId==0">
								{{item.samplePageGroupContentList[0].description}}
							</div>
							<div class="previewParagraph" v-if="item.samplePageGroup.samplePageGroupTypeId==1">{{item.samplePageGroupContentList[0].description | trim}}</div>
							<div class="previewParagraph" v-if="item.samplePageGroup.samplePageGroupTypeId==2">						
								<!--{{item.samplePageGroupContentList[0].description}}-->
								<div v-for="(c,l) in item.samplePageGroupContentList">
									<img :src="c.galleryUrl | client(client)" v-if="c.mediaType=='PICTURE'">
									<video width="100" :src="c.galleryUrl | client(client)" v-if="c.mediaType!='PICTURE'"></video>
								</div>
								<!--<div v-for="(c,l) in item.samplePageGroupContentList" v-if="c.mediaType==VIDEO">
									<video width="100%" :src="c.galleryUrl | client(client)"></video>
								</div>-->
							</div>
							
							<div class="previewTable" v-if="item.samplePageGroup.samplePageGroupTypeId==3">
								<table>
									<thead>
										<tr>
											<th>规格</th>
											<th>单位</th>
											<th>参数</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(c,l) in item.samplePageGroupContentList">
											<td>{{c.name}}</td>
											<td>{{c.unit}}</td>
											<td>
												<span v-if="c.valueFrom">{{c.valueFrom}}</span>
												<span v-if="c.valueFrom&&c.valueTo">-</span>
												<span v-if="c.valueTo">{{c.valueTo}}</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>				
				</div><!--pageCont-->
			</div>
		</div><!--pagewrap-->
		<div class="pageBtnWrap">
			<span v-show="eq!=0" @click="prev(false)">上一页</span>
			<span @click="edi">继续编辑</span>
			<span v-show="eq!=index-1" @click="prev(true)">下一页</span>
		</div>
	</div>
</template>

<script>
	import '../filter'
	import { mapGetters } from 'vuex'
	export default {
		props:['preview','fengmian'],
		data(){
			return {
				styleObject:{
					width:'',
					transitionDuration: '300ms',
					transform: 'translate3d(0px, 0px, 0px)'
				},
				createFMImage:'',
				self:'',
				pageCont:'',
				eq:0,
				index:0,
				client:''
			}
		},
		computed: mapGetters(['getsampleArray', 'data']),
		methods:{
			prev:function(i){
				var self = this
				if(!i){
					--self.eq
					self.styleObject.transform = 'translate3d('+(360-57)*self.eq*-1+'px, 0px, 0px)'
				}else{
					++self.eq
					self.styleObject.transform = 'translate3d('+(360-57)*self.eq*-1+'px, 0px, 0px)'
				}
			},
			edi:function(){
				this.$store.dispatch('previewShow',false)
			}
		},
		mounted(){
			var self = this
			this.$store.dispatch('setOssInfo', {
				num: '1',
				callback: function(client) {
					self.client = client
					self.createFMImage = client.signatureUrl(self.getsampleArray.sampleArray.sample.coverGalleryUrl, {
						process: "style/detail",
						expires: 7200
					})
				}
			})
			$.each(self.preview, function(i,v) {if(v.samplePage.isSection==1){++self.index}});			
			self.styleObject.width = (360-57)*self.index + 'px'
		}		
	}
</script>

<style scoped="scoped">
	.pageCont{height: 100%; background: #fff; display: flex; display: -webkit-flex; justify-content: center; flex-wrap: nowrap;}
	.pagewrap{width: 100%; height: 100%; overflow: hidden; overflow-y: auto;}
	.page{ width: 100%; height: 100%; overflow: auto;}
	.page::-webkit-scrollbar {
		position: fixed;
		background: rgba(0,0,0,0.1);
	    right: 0;
        width: 3px;     
        height: 1px;
    }
	.page::-webkit-scrollbar-thumb {
	       position: absolute;
	       width: 3px;
	       background: rgba(0,0,0,0.1);
	       right: 0;
	    }
	.page::-webkit-scrollbar-track {
		width: 3px;
		background: rgba(0,0,0,0.1);
	       position: absolute;
	       right: 0;
	}
	.previewbg{ width: 100%; height: 100%; background: rgba(0,0,0,0.7); position: fixed; left: 0; top: 0; z-index: 98;}
	.previewbox{ width: 80%; height: 80%; box-sizing: border-box; padding: 15px; background: #fff; position: fixed; left: 10%; top: 10%;}
	.wrap{ width: 100%; box-sizing: border-box; padding: 5px 10px;}
	.previewTable table{ width: 100%; border-collapse:collapse;}
	.previewTable table *{ border: 1px solid #dadada; vertical-align: middle; text-align: center; padding: 6px;}
	.previewTable table span{ border: 0; padding: 0;}
	.previewTable table thead tr th{ background: #f1f1f1;}
	.previewParagraph{white-space: pre-wrap;}
	.previewTitle{ font-weight: 600; font-size: 16px;}
	.fengmian_bot{width: 100%; height: 30px; line-height: 30px; background: #3CAADA; color: #fff; box-sizing: border-box; padding: 0px 10px; text-align: right;}
	.pageBtnWrap{ position: fixed; left: 0; bottom: 10%; text-align: center; color: #fff; width: 100%;}
	.pageBtnWrap span{ color: #fff; cursor: pointer; margin: 0px 15px;}
</style>