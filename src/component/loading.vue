<template>
	<div class="loadingBG">
		<div class="loader4"></div>
		<div class="loadingText">正在加载中...</div>
	</div>
</template>

<style scoped="scoped">
	.loadingBG {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background: rgba(0,0,0,0.1);
		width: 100%;
		height: 100%;
	}
	.loadingText{ width: 100%; text-align: center; position: fixed; bottom: 42%;}
	.loader4 {
	   width:50px;
	   height:50px;
	   position: fixed; left: 50%; top: 50%; margin-left: -25px; margin-top: -25px;
	   padding:0px;
	   border-radius:100%;
	   border:5px solid;
	   border-top-color:rgba(246, 36, 89, 1);
	   border-bottom-color:rgba(0,0,0, 0.1);
	   border-left-color:rgba(246, 36, 89, 1);
	   border-right-color:rgba(0,0,0, 0.1);
	   -webkit-animation: loader4 1s ease-in-out infinite;
	   animation: loader4 1s ease-in-out infinite;
	}
	@keyframes loader4 {
	   from {transform: rotate(0deg);}
	   to {transform: rotate(360deg);}
	}
	@-webkit-keyframes loader4 {
	   from {-webkit-transform: rotate(0deg);}
	   to {-webkit-transform: rotate(360deg);}
	}
</style>