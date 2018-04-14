<template>
	<div class="createFM">
		<h4>封面</h4>
		<div class="createFMImage">
			<img :src="getsampleArray.sampleArray.sample.coverGalleryUrl | GalleryUrl(createFMImage)" />
			<p><input type="text" v-model="getsampleArray.sampleArray.sample.sampleName" placeholder="样本名称"/></p>
			<p><input type="text" v-model="getsampleArray.sampleArray.sample.companyName" placeholder="公司名称"/></p>
		</div>
		{{getsampleArray.sampleArray.sample.NewcoverGalleryUrl}}
		<h4>目录页面</h4>
		<ul>
			<li v-for="(res,index) in list" :class="{active:res.samplePage.isSection==0}" :key='index'>
				{{res.samplePage.samplePageName}}
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props:['list'],
		data() {
			return {
				createFMImage: ''
			}
		},
		computed: mapGetters(['getsampleArray', 'data']),
		methods: {

		},
		mounted() {			
			var self = this,m=null
			this.$store.dispatch('setOssInfo', {
				num: '1',
				callback: function(client) {
					self.createFMImage = client.signatureUrl(self.getsampleArray.sampleArray.sample.coverGalleryUrl, {
						process: "style/detail",
						expires: 7200
					})
				}
			})
		}
	}
</script>

<style>

</style>