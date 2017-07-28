<template>
	<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
		<mu-list>
			<mu-list-item @click="itemClick(radio)" v-for="(radio, index) in radioList" :key="radio.id" :id="radio.id" :data-index="index" :title="radio.name + ' - ' + radio.singer[0].name" :class="radio.id == songId ? 'cur-song' : ''"  />
		</mu-list>
	</mu-bottom-sheet>
</template>
<script>
	import bus from './eventBus.js'
	export default {
		props: {
			bottomSheet: false,
			radioList: {
				type: Array,
				default: []
			},
			songId: ''
		},
		mounted () {
			bus.$on('goNext', () => {
				var len = this.radioList.length; //列表长度，一般是20
				var currentSong = this.radioList.filter(item => item.id == this.songId);
				var cur_index = this.radioList.indexOf(currentSong[0]);
				if(cur_index === (len - 1)) { // 如果当前歌曲是列表中最后一条，则下一条从第一首开始
					this.itemClick(this.radioList[0]);	
				}else {
					this.itemClick(this.radioList[cur_index + 1]);	
				}
			})
		},
		methods: {
			closeBottomSheet () {
				this.$emit('closeBottomSheet');
			},
			itemClick (radio) {
				if(radio.id == this.songId) {return;}
		        var songInfo = {
		          songId: radio.id,
		          songName: radio.name,
		          albumId: radio.album.id,
		          albumName: radio.album.name,
		          singerId: radio.singer[0].id,
		          singerName: radio.singer[0].name
		        }
		        S.songService.setSongInfo(songInfo);
				this.$emit('playSong', songInfo);
			}
		}
	}
</script>
<style lang="less">
	.mu-bottom-sheet {
		overflow: auto;
		height: 380px;
	}
	.cur-song .mu-item {
		color: #7e57c2;
	}
</style>