<template>
	<div class="login">
		<h2>找样本</h2>
		<div class="Wrap">
			<div class="ewm"></div>
			<div class="ewm_title">
				<b></b> 扫码登录更方便
			</div>
			<div class="title">账号密码登录</div>
			<input type="text" class="Wrap_input" v-model="username" placeholder="请输入账号" />
			<input type="password" class="Wrap_input" v-model="userpass" placeholder="请输入密码" />
			<button class="Loginbtn" @click="LoginBtn">登录</button>
		</div>
		<div class="QR"></div>
		
		<loading v-if='data.loading'></loading>		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import loading from '../component/loading'
	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				userpass: ''
			}
		},
		computed: mapGetters(['data']),
		components:{
			loading
		},
		methods: {
			LoginBtn: function() {
				var self = this
				if(self.username==''){
					$.Toast({title:'请输入用户名'})
				}else if(self.username==''){
					$.Toast({title:'请输入密码'})
				}else{
					this.$store.dispatch('Login', {
						username: self.username,
						password: self.userpass,
						callback: function(res) {
							if(res.retCode == 199||res.retCode == 198) {
								$.Toast({title:'用户名或密码不正确'})
							} else if(res.retCode == 200) {
								self.extend.SetSession('token',res.account)
								self.$router.push({path:'/Index'})
							}else{
								console.log(res)
							}
						}
					})
				}
			}
		},
		mounted() {
			console.log(this.extend)
		}
	}
</script>
<style scoped>
	.login {
		width: 580px;
		height: 100%;
		margin: auto;
		display: block;
	}
	
	.login h2 {
		display: block;
		line-height: 200%;
		text-align: center;
		padding-top: 25%;
		margin-bottom: 37px;
	}
	
	.login .Wrap {
		width: 426px;
		height: 356px;
		box-sizing: border-box;
		padding: 10px 50px;
		border: 1px solid #ccc;
		float: left;
		position: relative;
	}
	
	.login .QR {
		width: 138px;
		height: 358px;
		float: right;
		background: url(../../static/img/LoginQR.png) no-repeat;
	}
	
	.login .ewm {
		width: 46px;
		height: 46px;
		position: absolute;
		right: 0;
		top: 0;
		background: url(../../static/img/Icon.png) no-repeat -76px -0px;
		z-index: 1;
	}
	
	.login .ewm_title {
		width: 139px;
		text-indent: 27px;
		color: #df9c1f;
		height: 27px;
		line-height: 27px;
		background: #fefcee;
		border: 1px solid #f3d995;
		position: absolute;
		top: 15px;
		right: 10%;
		z-index: 2;
	}
	
	.login .ewm_title:before {
		content: '';
		border-top: 5px solid transparent;
		border-left: 7px solid #f3d995;
		border-bottom: 5px solid transparent;
		position: absolute;
		right: -7px;
		top: 7px;
	}
	
	.login .ewm_title:after {
		content: '';
		border-top: 4px solid transparent;
		border-left: 6px solid #fefcee;
		border-bottom: 4px solid transparent;
		position: absolute;
		right: -6px;
		top: 8px;
	}
	
	.login .ewm_title b {
		display: block;
		width: 19px;
		height: 19px;
		background: url(../../static/img/Icon.png) no-repeat 0px -4px;
		position: absolute;
		left: 5px;
		top: 4px;
	}
	
	.login .Wrap .title {
		width: 100%;
		margin-top: 45px;
		color: #222;
		font-weight: 600;
		font-size: 16px;
	}
	
	.Wrap_input {
		width: 100%;
		color: #666;
		height: 46px;
		line-height: 46px;
		text-indent: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-top: 20px;
	}
	
	.Loginbtn {
		width: 100%;
		margin-top: 28px;
		text-align: center;
		color: #222;
		height: 43px;
		line-height: 43px;
	}
	
	.error {
		color: #f00;
		line-height: 43px;
	}
</style>