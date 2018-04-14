<template>
	<div class="ListView">
		<headertop></headertop>
		<menulist></menulist>
		<div class="routerView">
			<router-view/>
		</div>
		
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import headertop from '../component/Header'
	import menulist from '../component/menuList'
	export default {
		data(){
			return {
				ListView:[]
			}
		},
		components:{
			headertop,
			menulist
		},
		computed:mapGetters([
			'data'
		]),
		methods:{},
		mounted(){
			
			console.log(this.data.sampleList)
		}
	}
</script>

<style>
</style>