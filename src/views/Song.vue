<template>
  <div class="page-song">
    <div class="m-song-bg">
      <!-- 歌曲背景图 -->
    </div>
    <div class="m-song-content">
      <!-- 歌曲主要内容，标题加歌词 -->
      <div class="song-info">
        <mu-list>
          <mu-list-item :title="songInfo.songName" :describeText="songInfo.singerName">
            <img src="">
            <mu-icon class="icon_play" :value="icon_value" slot="right" @click="switchPlay" />
          </mu-list-item>
        </mu-list>
      </div>
      <lyric></lyric>
    </div>
    <div class="m-song-control">
      <!-- audio控制条 -->
    </div>
  </div>
</template>

<script>
import lyric from './../components/Lyric'
export default {
  name: 'song',
  data () {
    return {
      songInfo: '',
      songUrl: '',
      playing: true
    }
  },
  mounted () {
    this.getSongInfo();
  },
  methods: {
    getSongPic () {
      // var songUrl = 'music/photo/album_{0}/{2}/{0}_albumpic_{1}_0.jpg';
      // this.songUrl = songUrl.format(300, imageId, imageId % 100);
    },
    getLyric () {
      store.getLyric(this.songInfo.songId).then(resp => {
        console.log(resp.data)
      }, err => {
        if(err.statu === 404) { // 找不到歌词
          console.info('暂无歌词');
        }
      });
    },
    getSongInfo () {
      this.songInfo = S.songService.getSongInfo();
      if(this.songInfo) {
        this.getSongPic();
        this.getLyric();
      }else {
        this.$router.go(-1);
      }
    },
    switchPlay () {
      this.playing = !this.playing;
    }
  },
  computed: {
    'icon_value' () {
      return this.playing ? 'play_circle_outline' : 'pause_circle_outline';
    }
  },
  components: { lyric }
}
</script>
  
<style lang="less">
  .page-song, .m-song-bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
  }
  .page-song {
    top: 56px;
    .m-song-bg {
      top: 0;
    }
    .icon_play {
      font-size: 36px;
      color: #999;
    }
    .mu-ripple-wrapper {
      display: none;
    }
  }
</style>
