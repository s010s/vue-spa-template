<template>
<p>
	<a href="https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/lazy.md" target="_blank">动态组件载入 lazy load</a>
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
		ready:function(){
			this.$root.$set('header',this.title)
		}
	}
</script>