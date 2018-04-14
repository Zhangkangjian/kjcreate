<template>
	<div class="header flex">
		<div class="logo"><img src="../../static/img/Logo.png"></div>
		<div class="outLogin">{{username}} <span @click="outLogin">退出</span></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				username:''
			}
		},
		methods:{
			outLogin:function(){
				this.extend.RemoveSession('token')
				this.$router.push({path:'/'})
			}
		},
		mounted(){
			this.username = this.extend.GetSession('token').deviceName
		}
	}
</script>

<style>
</style>