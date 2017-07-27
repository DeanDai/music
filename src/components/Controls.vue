<template>
	<div class="controls">
	    <mu-content-block>
	        <mu-flexbox>
	          <span class="cur-time">{{currentTimeStr}}</span>	
	          <mu-flexbox-item class="flex-slider">
	          <mu-slider :max="duration" :value="currentTime" class="slider" @change="handleChange"/>
	          </mu-flexbox-item> 
	          <span>{{totalTimeStr}}</span>
	        </mu-flexbox>
	      </mu-content-block>
	  </div>
</template>
<script>
	export default {
		props:['songId', 'play'],
		data () {
			return {
				audio: null,
				duration: 0,
				currentTime: 0,
				currentSecond: 0,
				totalTimeStr: '00:00',
			}
		},
		mounted () {
			this.initAudio();
		},
		computed: {
			currentTimeStr(){
		      return util.convertToTime(this.currentSecond);
		    }
		},
		destroyed () {
			this.audio && this.audio.pause();
			this.currentTime = 0;
		},
		watch: {
			'play' (newVal, oldVal) {
				if(newVal) {
					this.audio.play();
				}else {
					this.audio.pause();
				}
			}
		},
		methods: {
			initAudio () {
				if(this.songId) {
					this.audio = new Audio();
					var songUrl = `http://ws.stream.qqmusic.qq.com/${this.songId}.m4a?fromtag=46`;
	      			this.audio.src = songUrl;
					this.audio.addEventListener("timeupdate",e => {
						this.duration = this.audio.duration;
						if(this.duration != 0){
							this.totalTimeStr = util.convertToTime(this.duration);
							if(this.currentSecond != parseInt(this.audio.currentTime)){
								this.currentSecond = parseInt(this.audio.currentTime);
							}
						}
						this.currentTime = this.audio.currentTime;
						this.$emit('changeCurrentTime', this.audio.currentTime);
					});
					this.audio.loop = true;
					this.audio.play();
					this.$emit('play', true);
				}
			},
			handleChange (value) {
				this.audio.currentTime = value;
			}
		}
	}
</script>
<style lang="less">
	.controls {
		position: absolute;
	    bottom: 20px;
	    width: 100%;
	    .mu-flexbox {
	    	>span { color: #fff; }
	    }
	    .mu-slider {
	    	margin-bottom: 0;
	    }
	    .flex-slider {
    	    margin-right: 8px;
	    }
	}
</style>