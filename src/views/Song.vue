<template>
  <div class="page-song">
    <!-- 歌曲背景图 -->
    <div class="m-song-bg blur" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="bg_mask" style="opacity:0.6;"></div>
    <div class="m-song-content">
      <!-- 歌曲主要内容，标题加歌词 -->
      <div class="song-info">
        <mu-list>
          <mu-list-item :title="songInfo.songName" :describeText="songInfo.singerName">
            <mu-avatar slot="left" :src="imgUrl"/>
            <mu-icon class="icon_play" :value="icon_value" slot="right" @click="switchPlay" />
          </mu-list-item>
        </mu-list>
      </div>
      <lyric :song-id="songInfo.songId" :current-time="currentTime"></lyric>
    </div>
    <div class="m-song-control">
      <!-- audio控制条 -->
      <div class="radio-list">
        <mu-icon value="queue_music" />
      </div>
      <controls :song-id="songInfo.songId" :play="playing" @changeCurrentTime="changeCurrentTime"></controls>
    </div>
  </div>
</template>

<script>
import lyric from './../components/Lyric'
import controls from './../components/Controls'
import _ from 'lodash'
export default {
  name: 'song',
  data () {
    return {
      songInfo: '',
      playing: true,
      lrcCurIndex: 0,
      currentTime: 0
    }
  },
  components: { lyric, controls },
  created () {
    this.getSongInfo();
  },
  methods: {
    getSongInfo () {
      this.songInfo = S.songService.getSongInfo();
      if(!this.songInfo) {
        this.$router.go(-1);
      }
    },
    switchPlay () {
      this.playing = !this.playing;
    },
    play (isPlay) {
      this.playing = isPlay;
    },
    changeCurrentTime(currentTime){
        this.currentTime = currentTime;
    }
  },
  computed: {
    'icon_value' () {
      return !this.playing ? 'play_circle_outline' : 'pause_circle_outline';
    },
    'imgUrl' () {
      return `http://imgcache.qq.com/music/photo/album_300/${this.songInfo.albumId%100}/300_albumpic_${this.songInfo.albumId}_0.jpg`
    }
  }
}
</script>
  
<style lang="less" scope>
  .page-song, .m-song-bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
  }
  .page-song {
    padding-top: 56px;
    .m-song-bg {
      z-index: 1;
      background-size: cover;
      background-position: bottom center;
    }
    .mu-list {
      border: 0;
      padding: 0;
      z-index: 3;
    }
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
    .m-song-control {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 90px;
    }
  }
</style>
