<template>
<div>
	<input type="text" v-if="type=='text'" v-model="models" @blur="RenderInput"/>
	<textarea v-if="type=='textarea'" v-model="models" @blur="RenderInput"></textarea>
</div>
</template>

<script>
export default {
	props:['type','model','index'],
	data(){
		return {
			models:''
		}
	},
	methods:{
		RenderInput:function(){
			this.$emit('RenderInput',this.models,this.index);
		}
	},
	mounted(){
		this.models = this.model
	}
}
</script>

<style>
</style>