<template>
	<div>
		<mu-list v-for="item in list" :key="item.id">
			<mu-list-item :title="item.songName">
		      <span slot="describe">
		        <span>{{item.singerName}}</span>
		      </span>
		      <mu-icon-menu slot="right" icon="more_vert">
		      </mu-icon-menu>
		    </mu-list-item>
	  	</mu-list>
	</div>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			open: false
		},
		name: 'leftSide',
		methods: {
			close () {
		      this.$emit('slideToggle', 'close');
		    }
		}
	}
</script>
<style>
	.popup-left {
	  display: flex;
	  width: 85%;
	  max-width: 375px;
	  height: 100%;
	  align-items: center;
	  padding: 24px;
	}
</style>