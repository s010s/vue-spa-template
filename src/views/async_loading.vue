<template>
<p>
	在此router的配置中加上 waitForData:true 。 <a target="_blank" href="https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/data.md">详情</a>
</p>

</template>

<script>
	require('../css/b.css');
	module.exports = {

		//props: ['父组建传的值'],
		data:function(){
			return {
				title:'async'
			}
		},
		route:{
			waitForData:true,
			data:function(transition){
				setTimeout(function(){
					transition.next();
				},3000);
			}
		},
		ready:function(){
			this.$root.$set('header',this.title)
		}
	}
</script>