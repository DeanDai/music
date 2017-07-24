<template>
  <div class="page-home">
      <mu-tabs class="m-p-f m-z-max" :value="activeTab" @change="handleTabChange">
        <mu-tab value="recommand" title="推荐音乐"></mu-tab>
        <mu-tab value="hot" title="热歌榜" @active="getHot"></mu-tab>
        <mu-tab value="search" title="搜索" @active="startSearch"></mu-tab>
      </mu-tabs>
      <div class="tab-content">
        <div v-if="activeTab === 'recommand'">
          <mu-sub-header>推荐电台</mu-sub-header>
          <recommand-radio :list="recommandRadio"></recommand-radio>
          <mu-sub-header>最新音乐</mu-sub-header>
          <latest :list="latestMusicList"></latest>
        </div>
        <div v-if="activeTab === 'hot'">
          This is hot
        </div>
        <div v-if="activeTab === 'search'">
            <search :word="keyword" :hot-list="hotList" :history-list="historyList"></search>
        </div>
      </div>
  </div>
</template>

<script>
import latest from './../components/Latest'
import search from './../components/Search'
import recommandRadio from './../components/RecommandRadio'
export default {
  name: 'home',
  components: { latest, search, recommandRadio },
  data () {
    return {
      keyword: '',
      activeTab: '',
      latestMusicList: [],
      hotList: [],
      historyList: [],
      recommandRadio: []
    }
  },
  mounted () {
    this.initPage();
  },
  methods: {
    initPage () {
      this.activeTab = S.tabService.getCurrentTab() || 'recommand';
      if(this.activeTab == 'recommand') {
        this.getRecommand();
      }
    },
    getRecommand () {
      this.getRecommandMusic();
      this.getLatestMusic();
    },
    getRecommandMusic () {
      var result = store.getRecommand().then(resp => {
        var result = resp.data;
        this.recommandRadio = result.data.radioList;
      });
    },
    getLatestMusic () {
      var result = store.getLastest().then(resp => {
        var result = resp.data;
        this.latestMusicList = result.songlist || [];  
      });
    },
    getHot () {
      
    },
    startSearch () {
      store.getHot().then(resp => {
        var result = util.parseData(resp.data);
        this.hotList = result.data.hotkey;
      });
      this.historyList = util.cache('s_h_list') || [];
    },
    handleTabChange (val) {
      this.activeTab = val;
      S.tabService.setCurrentTab(this.activeTab);
    }
  }
}
</script>
  
<style>
  .tab-content {
    padding-top: 48px;
  }
</style>
