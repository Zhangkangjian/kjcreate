<template>
	<div class="main">
		<h2>未发行</h2>
		<table class="table" border="0" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th align="left">序号</th>
					<th align="left">样本名称</th>
					<th align="left">公司名称</th>
					<th align="right">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(res,i) in data.sampleList">
					<td>{{i+1}}</td>
					<td>{{res.sampleName}}</td>
					<td>{{res.companyname}}</td>
					<td width="15%" style="text-align: right;">
						<a href="javascript:;" @click="edi(res.sampleMasterId,res)">编辑</a>
						<a href="javascript:;" @click="send(res.sampleMasterId)">发布</a>
						<a href="javascript:;" @click="remove(res.sampleMasterId)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
		
		<loading v-if='data.loading'></loading>		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import loading from '../component/loading'
	export default {
		computed: mapGetters(['data']),
		components:{
			loading
		},
		methods:{
			edi(i,v){
				console.log(v)
				var sampleMasterId = v.sampleMasterId
				var sampleId = v.sampleId
				this.$router.push({
					path:'/create',
					name:'create',
					query:{
						"query": i,
						"sampleMasterId":sampleMasterId,
						"sampleId":sampleId
					},
					params:{
						"loading":true
					}
				})
			},
			send(i){
				alert(i)
			},
			remove(i){
				this.$store.dispatch('Delete',{id:i,r:0})
			}
		},
		mounted(){
			this.$store.dispatch('setList',0)
		}
	}
</script>