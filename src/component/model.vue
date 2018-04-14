<template>
	<div class="filexbg">
		<div class="filexbox" v-bind:style="styleObject">
			<div class="filexbox_title">
				<span @click="close"></span>
			</div>
			<slot name='model'></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props:['height'],
		data(){
			return {
				styleObject:{
					height:this.height + 'px',
					marginTop:this.height/2*-1 + 'px'
				}
			}
		},
		methods:{
			close:function(){this.$store.dispatch('modelState',false)}
		}
	}
</script>

<style>
</style>