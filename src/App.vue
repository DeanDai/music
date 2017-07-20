<template>
  <div id="app">
  	<mu-appbar class="app-bar m-z-max">
      <mu-icon-button icon="menu" slot="left" @click="open" />
      <mu-icon-button icon="expand_more" slot="right" />
    </mu-appbar>
  	<left-side @slideToggle="slideToggle" :open="leftPopup"></left-side>
  	<div class="content">
      <transition name="fade"  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import leftSide from './components/LeftSide'
export default {
  name: 'app',
  data () {
  	return {
  		leftPopup: false
  	}
  },
  components: { leftSide },
  methods: {
  	open () {
      this.leftPopup = true;
    },
    slideToggle (val) {
      if(val === 'close') {
        this.leftPopup = false;
      }else {
        this.leftPopup = true;
      }
    }
  }
}
</script>

<style lang="less">
@import './assets/less/app.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .app-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    width: auto;
    -webkit-transition: all .45s cubic-bezier(.23,1,.32,1);
    transition: all .45s cubic-bezier(.23,1,.32,1);
  }
  .content {
    padding-top: 56px;
  }
}
</style>