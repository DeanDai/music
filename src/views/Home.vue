<template>
  <div class="page-home">
      <mu-tabs class="m-p-f m-z-max" :value="activeTab" @change="handleTabChange">
        <mu-tab value="recommand" title="推荐音乐"></mu-tab>
        <mu-tab value="hot" title="热歌榜"></mu-tab>
        <mu-tab value="search" title="搜索"></mu-tab>
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
            <search :word="keyword" :hot-list="hotList" :history-list="searchHistoryList"></search>
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
      searchHistoryList: [],
      recommandRadio: []
    }
  },
  mounted () {
    this.initPage();
  },
  methods: {
    showSearchHistoryList () {
      var searchHistoryList = S.searchService.getSearchHistory();
      this.searchHistoryList = searchHistoryList;
    },
    showKeyword () {
      this.keyword = S.searchService.getKeyword();
    },
    initPage () {
      this.activeTab = S.tabService.getCurrentTab() || 'recommand';
      this.showSearchHistoryList();
      this.showKeyword();
    },
    getRecommand () {
      this.getRecommandMusic();
      this.getLatestMusic();
    },
    getRecommandMusic () {
      store.getRecommand().then(resp => {
        var result = resp.data;
        this.recommandRadio = result.data.radioList;
      });
    },
    getLatestMusic () {
      store.getLastest().then(resp => {
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
    },
    handleTabChange (val) {
      this.activeTab = val;
      S.tabService.setCurrentTab(this.activeTab);
    }
  },
  watch: {
    'activeTab' (newVal, oldVal) {
      if(newVal == 'recommand') {
        this.getRecommand();
      }else if(newVal == 'hot') {
        this.getHot();
      }else if(newVal == 'search') {
        this.startSearch()
      }
    }
  }
}
</script>
  
<style>
  .tab-content {
    padding-top: 48px;
  }
</style>
