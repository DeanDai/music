<template>
  <div class="page-song">
    <!-- 歌曲背景图 -->
    <div class="m-song-bg blur" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
    <div class="bg_mask" style="opacity:0.6;"></div>
    <div class="m-song-content">
      <!-- 歌曲主要内容，标题加歌词 -->
      <song-info-header :song-info="songInfo" :img-url="imgUrl" @play="play" :playing="playing"></song-info-header>
      <lyric :song-id="songInfo.songId" :current-time="currentTime"></lyric>
    </div>
    <div class="m-song-control">
      <div class="radio-list" v-if="radioList.length">
        <mu-icon value="queue_music" @click="showBottomSheet" />
      </div>
      <!-- audio控制条 -->
      <controls :song-id="songInfo.songId" :play="playing" @changeCurrentTime="changeCurrentTime" @play="play"></controls>
    </div>
    <radio-list :song-id="songInfo.songId" @playSong="playSong" @closeBottomSheet="closeBottomSheet" :bottom-sheet="bottomSheetShow" :radio-list="radioList"></radio-list>
  </div>
</template>

<script>
import lyric from './../components/Lyric'
import controls from './../components/Controls'
import radioList from './../components/RadioList'
import songInfoHeader from './../components/SongInfoHeader'
import _ from 'lodash'
export default {
  name: 'song',
  data () {
    return {
      songInfo: '',
      playing: true,
      currentTime: 0,
      bottomSheetShow: false,
      radioList: []
    }
  },
  components: { lyric, controls, radioList, songInfoHeader },
  created () {
    this.getRadioList();
  },
  methods: {
    getRadioList () {
      this.radioList = S.radioService.getRadioList();
      this.getSongInfo();
    },
    getSongInfo () {
      if(this.radioList.length) {
        var song = this.radioList[0];
        var songInfo = {
          songId: song.id,
          songName: song.name,
          albumId: song.album.id,
          albumName: song.album.name,
          singerId: song.singer[0].id,
          singerName: song.singer[0].name
        }
        S.songService.setSongInfo(songInfo);
        this.songInfo = songInfo;
      }else {
        this.songInfo = S.songService.getSongInfo();
      }
      if(!this.songInfo) {
        this.$router.go(-1);
      }
    },
    play (isPlay) {
      this.playing = isPlay;
    },
    changeCurrentTime(currentTime){
        this.currentTime = currentTime;
    },
    showBottomSheet () {
      this.bottomSheetShow = true;
    },
    closeBottomSheet () {
      this.bottomSheetShow = false;
    },
    playSong (song) {
      this.songInfo = song;
      this.songId = song.id;
    }
  },
  computed: {
    'imgUrl' () {
        return this.songInfo.albumId && `http://imgcache.qq.com/music/photo/album_300/${this.songInfo.albumId%100}/300_albumpic_${this.songInfo.albumId}_0.jpg`
    }
  }
}
</script>
  
<style lang="less">
  .page-song, .m-song-bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
  }
  .page-song {
    padding: 0;
    z-index: 999999;
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
    .m-song-control {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 90px;
      .radio-list {
        position: relative;
        left: 24px;
        top: -12px;
        i{
          font-size: 32px;
          color: rgba(255,255,255,.6);
        }
      }
    }
  }
</style>
