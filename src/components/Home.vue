<template>
  <div class="page-home">
      <mu-tabs class="m-p-f m-z-max" :value="activeTab" @change="handleTabChange">
        <mu-tab value="recommand" title="推荐音乐" @active="getRecommand"></mu-tab>
        <mu-tab value="hot" title="热歌榜" @active="getHot"></mu-tab>
        <mu-tab value="search" title="搜索" @active="startSearch"></mu-tab>
      </mu-tabs>
      <div class="tab-content">
        <div v-if="activeTab === 'recommand'">
          <mu-sub-header>推荐歌单</mu-sub-header>
          <mu-sub-header>最新音乐</mu-sub-header>
          <latest :list="latestMusicList"></latest>
        </div>
        <div v-if="activeTab === 'hot'">
          This is hot
        </div>
        <div v-if="activeTab === 'search'">
            <search :word="keyword"></search>
        </div>
      </div>
  </div>
</template>

<script>
import latest from './../components/Latest'
import search from './../components/Search'
export default {
  name: 'home',
  components: { latest, search },
  data () {
    return {
      keyword: '',
      activeTab: 'recommand',
      latestMusicList: []
    }
  },
  mounted () {
    this.getLatestMusic();
  },
  methods: {
    getRecommand () {

    },
    getHot () {

    },
    startSearch () {

    },
    getLatestMusic () {
      var result = store.getLastest().then(resp => {
        this.latestMusicList = resp.data.songlist || [];  
      });
    },
    handleTabChange (val) {
      this.activeTab = val;
    }
  }
}
</script>
  
<style>
  .tab-content {
    padding-top: 48px;
  }
</style>
