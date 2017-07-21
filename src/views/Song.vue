<template>
  <div class="page-song">
    <div class="m-song-bg">
      
    </div>
    <div class="m-song-content">
      <img :src="songUrl">
    </div>
  </div>
</template>

<script>
export default {
  name: 'song',
  data () {
    return {
      songUrl: ''
    }
  },
  mounted () {
    this.getSongPic();
  },
  methods: {
    getSongPic () {
      // var songUrl = 'music/photo/album_{0}/{2}/{0}_albumpic_{1}_0.jpg';
      // this.songUrl = songUrl.format(300, imageId, imageId % 100);
    }
  }
}
</script>
  
<style>
</style>
