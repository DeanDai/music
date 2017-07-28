<template>
	<div class="flex_item">
		<div class="lyric">
			<div class="lyric-box">
				<mu-list :style="{marginTop: lrcMarginTop}" v-if="!noLyric">
			    	<template v-for="lyric in lyricList">
			      		<mu-list-item :title="lyric.lrc" :class="lyric.selected ? selectedColor : ''" />
			    	</template>
			  	</mu-list>
			  	<div class="no-lyric" v-else>暂无歌词</div>
			</div>
		</div>
	</div>
</template>
<script>
	const xml2js = require('xml2js');
	export default {
		props:['songId', 'currentTime'],
		data () {
			return {
				lyricList: [],
				lyricTimeArr: [],
				selectedColor: 'cur_select_lrc',
				noLyric: false
			}
		},
		mounted () {
			this.getLyric();
		},
		watch: {
			'songId' (newVal, oldVal) {
				this.fetchLyric();
			}
		},
		methods: {
			fetchLyric () {
				store.getLyric(this.songId).then(resp => {
					var result = resp.data;
					var parser = new xml2js.Parser();
					parser.parseString(result,(err, json) => {
						this.noLyric = false;
						var result = util.convertLrcArr(json.lyric.split('\n'));
						this.lyricList = result;
						this.lyricTimeArr = this.lyricList.map(item => item.time);
					});
				}, err => {
					if(err.status === 404) { // 找不到歌词
						console.info('暂无歌词');
						this.noLyric = true;
					}
				});
			},
			getLyric () {
				if(this.songId) {
					this.fetchLyric();
				}
		    }
		},
		computed: {
			lrcMarginTop (){
		      return this.lrcCurIndex * (-2.8) + 2 + 'em';
		    },
		    lrcCurIndex () {
		    	var index = _.sortedIndex(this.lyricTimeArr, this.currentTime);
		        for (var i = 0; i < this.lyricList.length; i++) {
		            this.lyricList[i].selected = false;
		        }
		        if (index > 0) {
		            this.lyricList[index - 1].selected = true;
		        }
		        return index;
		    }
		}
	}
</script>
<style lang="less">
	.lyric {
	    overflow: hidden;
	    .lyric-box {
	    	position: relative;
		    width: 100%;
		    height: 480px;
		    overflow: hidden;
		    top: 24px;
		    bottom: 32px;
		    z-index: 3;
		    .mu-item {
		    	min-height: 44px;
		    	height: 44px;
			    line-height: 44px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    font-size: 16px;
			    color: rgba(255, 255, 255, 0.6);
			    text-align: center;
			    padding: 12px 16px;
		    }
		    .cur_select_lrc {
		    	.mu-item {
		    		color: #7e57c2;
		    	}
		    }
		    .no-lyric {
	    	    text-align: center;
			    color: #fff;
			    margin-top: 50%;
			    font-size: 24px;
		    }
	    }
	    @media screen and (max-height: 568px) and (min-height: 480px) {
	    	.lyric-box {
	    		height: 350px;
	    	}	
	    }
	    .mu-list {
    	    position: absolute;
		    left: 10px;
		    right: 10px;
		    overflow: hidden;
		    -webkit-transition: all 1s;
    				transition: all 1s;
	    }
	}
</style>