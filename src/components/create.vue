<template>
	<div class="create">
		<headertop></headertop>
		<div class="createWrap">
			<h2 style="float: left;">创建样本</h2>
			<div class="position">您当前的位置：<router-link tag='a' to="/Index">首页</router-link> > 创建样本</div>
			<div style="clear: both;"></div>
			<fengmian :list='getsampleArray.sampleArray.samplePageList'></fengmian>
			<div class="createBox">
				<ul>
					<draggable v-model="getsampleArray.sampleArray.samplePageList" :move="getdata" @update="datadragEnd">
						<transition-group>
							<li v-for="(res,index) in getsampleArray.sampleArray.samplePageList" :class="{active:res.samplePage.isSection==0}" :key='index'>
								<p>{{res.samplePage.samplePageName}}</p>
								<span @click="remove(index)">删除</span>
								<span v-if="res.samplePage.isSection==0" @click="createPage(index)">添加</span>
								<span v-if="res.samplePage.isSection==1" @click="Pagecont(index)">编辑</span>
							</li>
						</transition-group>
					</draggable>
				</ul>

				<div class="btn-wrap">
					<button class="btn-block" @click="addBlock">添加模块</button>
					<button class="btn-block" @click="preview">预览</button>
					<button class="btn-block" @click="savePage">保存页面</button>
				</div>

			</div>
		</div>

		<model :height='85' v-if='data.model'>
			<div class="flex" slot='model'>
				<input type="text" v-model="modelText" />
				<button @click="modelBtn(modelNum)">提交</button>
			</div>
		</model>

		<preview :preview='previewList' :fengmian='true' v-if="data.previewShow"></preview>
		<loading v-if='data.loading'></loading>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import headertop from '../component/Header'
	import model from '../component/model'
	import fengmian from '../component/fengmian'
	import preview from '../component/preview'
	import loading from '../component/loading'
	import draggable from 'vuedraggable'
	export default {
		data() {
			return {
				modelText: '',
				eq: '',
				modelNum: '',
				previewList:'',
				pageid:'',
				sampleMasterId:'',
				sampleId:'',
				href:'',
				sequence: 0
			}
		},
		computed: mapGetters(['getsampleArray', 'data']),
		components: {
			headertop,
			model,
			draggable,
			fengmian,
			preview,
			loading
		},
		methods: {
			createPage: function(i) { //添加页面
				this.modelText = ''
				this.eq = i
				this.modelNum = 1
				this.$store.dispatch('modelState', true)
			},
			addBlock: function() { //添加模块
				this.modelText = ''
				this.modelNum = 0
				this.$store.dispatch('modelState', true)
			},
			modelBtn: function(i) {
				var self = this
				if(this.modelText == '') {
					alert('请输入信息')
				} else {
					this.$store.dispatch('addPages', {
						num: i,
						name: self.modelText,
						index: self.eq
					})
					this.$store.dispatch('modelState', false)
				}
			},
			remove: function(i) {
				this.$store.dispatch('removeList', i)
			},
			Pagecont: function(i) {
				var self = this
				this.$router.push({
					path: '/createInfo/' + i,
					query:self.href
				})
			},
			savePage: function() {//保存并提交
				var self = this
				$.each(self.getsampleArray.sampleArray.samplePageList, function(i, v) {
					v.samplePage.sequence = i
				});
				var JSONstring = JSON.stringify(self.getsampleArray.sampleArray)
				self.$store.dispatch('savePage',{
					Json:JSONstring,
					sampleMasterId:self.sampleMasterId,
					sampleId:self.sampleId
				})
			},
			preview:function(){//预览
				var self = this
				$.each(self.getsampleArray.sampleArray.samplePageList, function(i, v) {
					v.samplePage.sequence = i
				});
				self.previewList = self.getsampleArray.sampleArray.samplePageList
				this.$store.dispatch('previewShow',true)
			},
			getdata(evt) {},
			datadragEnd(evt) {},
		},
		mounted() {
			window.onbeforeunload = function() { return "确认离开当前页面吗？未保存的数据将会丢失"; }
			var self = this
			var pageid = this.$route.query.query
			self.pageid = pageid
			if(pageid) {

				if(self.$route.query.sampleMasterId&&self.$route.query.sampleId){
					self.sampleId = self.$route.query.sampleId
					self.sampleMasterId = self.$route.query.sampleMasterId
					self.href = self.$route.query
				}
				console.log(self.$route.params.loading)
				if(self.$route.params.loading){
					this.$store.dispatch('setSampleDetail', {
						said: pageid,
						Release: 0,
						callback: function(sequence) { self.sequence = sequence }
					})
				}
			}
		}
	}
</script>

<style>
	.position{ float: right; color: #666;}
</style>
