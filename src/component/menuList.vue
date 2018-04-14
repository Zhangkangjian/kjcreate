<template>
	<div class="menuList">
		<dl><dt>首页</dt></dl>
		<dl>
			<dt>样本管理</dt>
			<!--<dd @click="create()">1.1 创建样本</dd>-->
			<router-link tag='dd' to="/create">1.1 创建样本</router-link>
			<router-link tag='dd' to="/Index/ListTable">1.2 未发行</router-link>
		</dl>
	</div>
</template>

<script>
export default {
	methods:{
		create:function(){
			window.open(window.location.origin+"/#/create")
		}
	}
}
</script>

<style>
</style>