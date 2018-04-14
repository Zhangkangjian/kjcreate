<template>
	<div class="createInfo">
		<div class="Info">
			<draggable v-model="obj" :move="getdata" @update="datadragEnd">
				<transition-group>
					<div class="itemView" v-for="(v,i) in obj" :key='i'>
						<div class="title" v-if="v.samplePageGroup.samplePageGroupTypeId==0">
							<h4>添加标题</h4>
							<p @click="remove(i)">删除</p>
							<div class="flex cl" style="padding: 10px 0px;"></div>
							<div v-for="(item,index) in v.samplePageGroupContentList">
								<input type="text" v-model="item.description" />
							</div>
						</div>
						<!--标题-->

						<div class="content" v-if="v.samplePageGroup.samplePageGroupTypeId==1">
							<h4>添加段落</h4>
							<p @click="remove(i)">删除</p>
							<div class="flex cl" style="padding: 10px 0px;"></div>
							<div v-for="(item,index) in v.samplePageGroupContentList">
								<textarea v-model="item.description"></textarea>
							</div>
						</div>
						<!--段落-->

						<div class="block" v-if="v.samplePageGroup.samplePageGroupTypeId==2">
							<h4>添加素材组</h4>
							<p @click="remove(i)">删除</p>
							<div class="flex cl" style="padding: 10px 0px;"></div>
							<div class="filebg" v-for="(item,index) in v.samplePageGroupContentList">
								<div class="filebg_before"></div>
								<div class="filebg_after"></div>
								<img :src="item.galleryUrl | client(client,data.curetxt)">
								<input type="file" @change="files($event,index,v)" :accept="v.samplePageGroup.MiniType || v.samplePageGroupContentList[0].mediaType=='VIDEO'?'video/*':'image/*'" />
								<div class="progress" v-if="item.progress">{{item.progressTxt}}</div>
								<b v-if="!item.progress" @click.stop="removeImages(i,index)"></b>
							</div>
							<!--@click="setUpload(index)"-->
							<div class="filebg" v-if="(v.samplePageGroup.MiniType || v.samplePageGroupContentList[0].mediaType=='VIDEO'?'video/*':'image/*')=='image/*'&&v.samplePageGroupContentList.length<10||(v.samplePageGroup.MiniType || v.samplePageGroupContentList[0].mediaType=='VIDEO'?'video/*':'image/*')=='video/*'&&v.samplePageGroupContentList.length<1">								
								<div class="filebg_before"></div>
								<div class="filebg_after"></div>								
								<input type="file" @change="files($event,null,v)" :accept="v.samplePageGroup.MiniType || v.samplePageGroupContentList[0].mediaType=='VIDEO'?'video/*':'image/*'" :multiple="v.samplePageGroup.multiples" />
							</div>
						</div>
						<!--素材组-->

						<div class="TableBlock" v-if="v.samplePageGroup.samplePageGroupTypeId==3">
							<h4>添加参数</h4>
							<p @click="remove(i)">删除</p>
							<div class="flex cl" style="padding: 10px 0px;"></div>

							<div class="flex-row" style="background: #efefef; border: 1px solid #dadada;">
								<div class="flex-cell Description">规格</div>
								<div class="flex-cell Unit">单位</div>
								<div class="flex-cell Parameter">参数</div>
							</div>
							<draggable v-model="v.samplePageGroupContentList" :move="getdatatable" @update="datadragEndtable($event,i)">
								<transition-group>
									<div class="flex-row" v-for="(item,index) in v.samplePageGroupContentList" :key='index'>
										<div class="flex-cell Description"><textarea v-model="item.name" name="" rows="" cols=""></textarea></div>
										<div class="flex-cell Unit"><input type="text" v-model="item.unit" /></div>
										<div class="flex-cell Parameter">
											<textarea v-model="item.valueFrom" name="" rows="" cols=""></textarea>
											<b style="border: 0;">-</b>
											<textarea v-model="item.valueTo" name="" rows="" cols=""></textarea>
										</div>
									</div>
								</transition-group>
							</draggable>
							<button class="addTr" @click="addTable(i)">添加参数</button>
						</div>

					</div>

				</transition-group>
			</draggable>

		</div>
		<div class="addBlock">
			<ul>
				<li @click="add('title')">添加标题</li>
				<li @click="add('content')">添加文章</li>
				<li @click="add('block')">添加素材组(图片)</li>
				<li @click="add('blockvideo')">添加素材组(视频)</li>
				<li @click="add('table')">添加参数</li>
			</ul>
		</div>
		<div style="clear: both;"></div>

		<button @click="save">保存</button>

		<model :height='460' v-if='data.model'>
			<div slot='model' class="videoSelect">
				<h2>选择视频封面</h2>
				<input type="text" v-model="data.curetxt" @input="cureFN" />
				<img :src="data.cureImage" />
				<button @click="cureClose">确定</button>
			</div>
		</model>

		<loading v-if='data.loading'></loading>

	</div>
</template>

<script>
	import vue from 'vue'
	import { mapGetters } from 'vuex'
	import model from '../component/model'
	import loading from '../component/loading'
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				miniType: '',
				client: '',
				sequence: 0,
				v:'',
				obj: [],
				objImage: [],
				href:'',
				links: '',
				fileName: '',
				fileE: {},
				avideo: {}
			}
		},
		computed: mapGetters(['data', 'getsampleArray']),
		components: {
			model,
			draggable,
			loading
		},
		methods: {
			add: function(info) {
				var self = this
				var sequenceList = self.sequence
				switch(info) {
					case 'title':
						this.obj.push({
							"samplePageGroup": {
								"samplePageGroupTypeId": 0,
								"sequence": '' //sequenceList
							},
							"samplePageGroupContentList": [{
								"description": ""
							}]
						})
						break
					case 'content':
						this.obj.push({
							"samplePageGroup": {
								"samplePageGroupTypeId": 1,
								"sequence": '' //sequenceList
							},
							"samplePageGroupContentList": [{
								"description": ""
							}]
						})
						break
					case 'block':
						this.obj.push({
							"samplePageGroup": {
								"samplePageGroupTypeId": 2,
								"MiniType": "image/*",
								"multiples": true,
								"sequence": '' //sequenceList
							},
							"samplePageGroupContentList": []
						})
						break
					case 'blockvideo':
						this.obj.push({
							"samplePageGroup": {
								"samplePageGroupTypeId": 2,
								"multiples": false,
								"MiniType": "video/*",
								"sequence": '' //sequenceList
							},
							"samplePageGroupContentList": []
						})
						break
					case 'table':
						this.obj.push({
							"samplePageGroup": {
								"samplePageGroupTypeId": 3,
								"sequence": '' //sequenceList
							},
							"samplePageGroupContentList": []
						})
						break
					default:
						console.log('no')
						break
				}
			},
			remove: function(i) {
				this.obj.splice(i, 1)
			},
			files: function(e, i, v) {
				var self = this
				self.v = v
				var arr = [],
					filearr = []
				if(i) {
					var type = e.target.files[0].name.split('.')[1]
					if(type == 'jpg' || type == 'png') {
						self.uploadFiles(type, e.target.files[0], i, v)
					} else if(type == 'mp4') {
						self.uploadFilesVideo(type, e.target.files[0], i, v)
					} else {
						alert('上传文件格式不正确')
					}
				} else {
					if(e.target.accept == 'image/*') {
						$.each(e.target.files, function(i, v) {
							arr.push(v.name.split('.')[1])
							filearr.push(v)
						});
						self.uploadFiles(arr, filearr, i, v) //循环上传
					} else {
						var type = e.target.files[0].name.split('.')[1]
						self.uploadFilesVideo(type, e.target.files[0], i, v)
					}

				}
			},
			uploadFiles: function(type, fileE, index, val) {
				var self = this
				if(type instanceof Array && fileE instanceof Array) {

					$.each(fileE, function(i, v) {
						var index = index ? index : val.samplePageGroupContentList.length
						self.$store.dispatch('uploadfile', {
							types: type[i],
							files: v,
							progress: function() {},
							callback: function(res) {
								if(val.samplePageGroupContentList.length<10){
									val.samplePageGroupContentList.push({
										"description": self.fileName,
										"mediaType": res.mediaType,
										"galleryUrl": res.galleryUrl,
										"NewgalleryUrl": res.NewgalleryUrl,
										"sequence": '' //
									})
								}
							}
						})
					});
				} else {
					var index = index ? index : val.samplePageGroupContentList.length
					self.$store.dispatch('uploadfile', {
						types: type,
						files: fileE,
						progress: function(p) {
							self.$set(val.samplePageGroupContentList, index, {
								"progress": true,
								"progressTxt": p + "%"
							})
						},
						callback: function(res) {
							self.$set(val.samplePageGroupContentList, index, {
								"description": self.fileName,
								"mediaType": res.mediaType,
								"galleryUrl": res.galleryUrl,
								"NewgalleryUrl": res.NewgalleryUrl,
								"sequence": '' //
							})
						}
					})
				}
			},
			uploadFilesVideo: function(type, fileE, index, v) {
				var self = this
				var index = index ? index : v.samplePageGroupContentList.length
				this.$store.dispatch('uploadfile', {
					types: type,
					files: fileE,
					progress: function(p) {
						self.$set(v.samplePageGroupContentList, index, {
							"progress": true,
							"progressTxt": p + "%"
						})
					},
					callback: function(res) {
						self.$set(v.samplePageGroupContentList, index, {
							"description": self.fileName,
							"mediaType": res.mediaType,
							"galleryUrl": res.galleryUrl,
							"NewgalleryUrl": res.NewgalleryUrl,
							"sequence": '' //
						})
						self.avideo = {
							old: res.galleryUrl,
							i: index
						}
					}
				})
			},
			removeImages: function(i, index) {
				var self = this
				self.obj[i].samplePageGroupContentList.splice(index, 1) //删除数组元素
			},
			addTable: function(index) {
				var sequence = 0
				this.obj[index].samplePageGroupContentList.push({
					"name": "",
					"unit": "",
					"valueTo": "",
					"valueFrom": "",
					"sequence": '' //sequence
				})
			},
			save: function() {
				var self = this
				if(confirm('是否保存页面')) {
					$.each(self.obj, function(i, v) {
						v.samplePageGroup.sequence = i
						$.each(v.samplePageGroupContentList, function(index, item) {
							item.sequence = index
						});
					});
					self.getsampleArray.sampleArray.samplePageList[self.$route.params.id].samplePageGroupList = self.obj
					self.$router.push({
						path: '/create?'+self.href
					})
				}
			},
			cureClose: function() {
				var self = this
				self.v.samplePageGroupContentList[self.avideo.i].zs = self.data.curetxt //添加图片帧数
				self.v.samplePageGroupContentList[self.avideo.i].NewgalleryUrl = self.data.cureImage
				self.$store.dispatch('modelState', false)
			},
			cureFN: function() {
				var self = this
				self.$store.dispatch('setOssInfo', {
					num: '1',
					callback: function(client) {
						var curetxts = self.data.curetxt ? self.data.curetxt : 0
						self.data.cureImage = client.signatureUrl(self.avideo.old, {
							expires: 3600,
							process: "video/snapshot,t_" + curetxts + ",f_jpg,w_400,h_225"
						})
					}
				})
			},
			getdata(evt) {},
			datadragEnd(evt) {},
			getdatatable(evt) {},
			datadragEndtable(evt, index) {}
		},
		mounted() {
			window.onbeforeunload = function() { return "确认离开当前页面吗？未保存的数据将会丢失"; }
			try {
				var self = this
				self.href = window.location.href.split('?')[1]
				if(self.getsampleArray.sampleArray.samplePageList[self.$route.params.id]) { //编辑页面
					self.extend.SetSession('Info',self.getsampleArray.sampleArray)
					var colId = 'sequence'
					var desc = function(x, y) {
						return(x[colId] < y[colId]) ? 1 : -1
					}
					var Arr = self.getsampleArray.sampleArray.samplePageList[self.$route.params.id].samplePageGroupList.sort(desc)
					if(Arr.length) {
						for(let i = 0; i < Arr.length; i++) {
							self.obj.push(Arr[i])
						}
					}

					self.$store.dispatch('setOssInfo', {
						num: '1',
						callback: function(client) {
							self.client = client
						}
					})

				} else {					
					self.getsampleArray.sampleArray = self.extend.GetSession('Info')
					var colId = 'sequence'
					var desc = function(x, y) {
						return(x[colId] < y[colId]) ? 1 : -1
					}
					var Arr = self.getsampleArray.sampleArray.samplePageList[self.$route.params.id].samplePageGroupList.sort(desc)
					if(Arr.length) {
						for(let i = 0; i < Arr.length; i++) {
							self.obj.push(Arr[i])
						}
					}

					self.$store.dispatch('setOssInfo', {
						num: '1',
						callback: function(client) {
							self.client = client
						}
					})
				}
			} catch(e) {
				console.log(e)
				//TODO handle the exception
			}

		}
	}
</script>

<style scoped="scoped">
	.flex-cell.Description {
		width: 50%;
	}
	/*规格*/
	
	.flex-cell.Unit {
		width: 20%;
	}
	/*单位*/
	
	.flex-cell.Parameter {
		width: 30%;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		align-items: center;
	}
	/*参数*/
	
	.flex-cell.Parameter b {
		display: block;
		margin: 0px 10px;
	}
	
	.addTr {
		display: block;
		width: 100%;
		outline: none;
		text-align: center;
		background: #fff;
		color: #222;
		border: 1px solid #dadada;
		padding: 10px 0px;
		font-size: 14px;
		margin-top: 15px;
		cursor: pointer;
	}
	
	.addTr:hover {
		background: #efefef;
	}
	
	.addTr:active {
		content: '\2715';
	}
</style>