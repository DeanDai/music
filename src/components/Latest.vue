<template>
	<mu-list>
		<mu-list-item :title="item.songName"  v-for="item in list" :key="item.id" @click="goToDetail(item)">
	      <span class="desc">{{item.singerName}} - {{item.albumName}}</span>
          <mu-icon value="play_circle_outline" class="m-icon-play" slot="right"/>
	    </mu-list-item>
  	</mu-list>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			goToDetail (song) {
				var songInfo = {
					songId: song.id,
					songName: song.songName,
					albumId: song.albumId,
					albumName: song.albumName,
					singerId: song.singerId,
					singerName: song.singerName
				}
				S.songService.setSongInfo(songInfo);
				S.radioService.setRadioList([]); // 重置radioList里的值
				this.$router.push('/song/' + songInfo.songId);
			}
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