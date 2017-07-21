<template>
	<div>
		<mu-list v-for="item in list" :key="item.id">
			<mu-list-item :title="item.songName">
		      <span class="desc">{{item.singerName}} - {{item.albumName}}</span>
              <mu-icon value="play_circle_outline" class="m-icon-play" slot="right"/>
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
		}
	}
</script>
<style lang="less">
	.mu-list {
	  padding: 0;
	  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	  .m-icon-play {
	  	color: #999;
	  }
	}
</style>