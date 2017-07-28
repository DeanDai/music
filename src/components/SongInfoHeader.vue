<template>
	<div class="song-info">
        <mu-list>
          <mu-list-item :title="songInfo.songName" :describeText="songInfo.singerName">
            <mu-avatar slot="left" :src="imgUrl"/>
            <mu-icon class="icon_play" :value="icon_value" slot="right" @click="switchPlay" />
          </mu-list-item>
        </mu-list>
      </div>
</template>
<script>
	export default {
		props:['songInfo', 'imgUrl', 'playing'],
    data () {
      return {
        playingFlag: true
      }
    },
		computed: {
			'icon_value' () {
		    return !this.playing ? 'play_circle_outline' : 'pause_circle_outline';
		  },
		},
    watch: {
      'playing' (newVal, oldVal) {
        this.playingFlag = newVal;
      }
    },
		methods: {
			switchPlay () {
		      this.playingFlag = !this.playingFlag;
		      this.$emit('play', this.playingFlag);
		    }
		}
	}
</script>
<style lang="less">
	.mu-avatar {
      height: 80px;
      width: 80px;
      img {
        -webkit-animation: circling 20s infinite linear;
        animation: circling 20s infinite linear;
        @-webkit-keyframes circling {
          0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg)
          }

          to {
              -webkit-transform: rotate(1turn);
              transform: rotate(1turn)
          }
        }

        @keyframes circling {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg)
            }

            to {
                -webkit-transform: rotate(1turn);
                transform: rotate(1turn)
            }
        }
      }
    }
    .song-info {
      .mu-item-wrapper {
        padding: 15px 0;
        background: rgba(0, 0, 0, 0.1);  
      }
      .mu-item {
        height: 80px;
        color: #fff;
        .mu-item-text {
          color: #fff;
        }
        .mu-item-left {
          width: 80px;
          max-height: 80px;
        }
        .mu-item-right {
          right: 24px;
          max-height: inherit;
        }
        &.show-left {
          padding-left: 120px;
        }
      }
    }
    .icon_play {
      font-size: 60px;
      color: rgba(255, 255, 255, .8);
    }
    .mu-ripple-wrapper {
      display: none;
    }
</style>