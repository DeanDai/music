<template>
	<div class="search-block">
		<form class="m-input m-p-r" action="#" @submit.prevent="search(text)">
			<div class="m-input-content m-p-r">
				<i class="mu-text-field-icon material-icons m-icon-search">search</i>
				<input type="search" name="search" class="input" placeholder="搜索歌手、歌曲" v-model="text" autocomplete="off">
			    <i class="mu-text-field-icon material-icons m-icon-search-cancel" v-if="text" @click="clearSearch">close</i>
			</div>
		</form>
		<div class="m-default" v-if="!text">
			<section class="m-hotlist">
				<h3 class="title">热门搜索</h3>
				<div>
					<mu-chip class="chip" v-for="hot in hotList" :key="hot.n" @click="search(hot.k)">{{hot.k}}</mu-chip>
				</div>
			</section>
			<section class="m-history">
				<h3 class="title">历史搜索</h3>
				<mu-list v-for="history in historyList" :key="history.id" @click="search(history.text)">
					<mu-list-item :title="history.text">
						<mu-icon value="history" class="m-icon-history" slot="left"/>
            <mu-icon value="close" @click="deleteCurrentHistory(history)" class="m-icon-delete" slot="right"/>
				  </mu-list-item>
			  </mu-list>
			</section>
		</div>
		<div class="m-search-result" v-else>
			<!-- <section class="m-matchlist">
				<h3>最佳匹配</h3>
			</section> -->
			<section class="m-songlist">
				<mu-list v-for="item in searchResult" :key="item.songid">
					<mu-list-item :title="item.songname">
			      <span class="desc" v-html="item.singer[0].name + ' - ' + item.albumname">
			      	{{item.singer[0].name + ' - ' + item.albumname}}
			      </span>
            <mu-icon value="play_circle_outline" class="m-icon-play" slot="right"/>
			    </mu-list-item>
		  	</mu-list>
			</section>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				historyList: [
					{id: 1, text: '越过山丘'}, {id: 2, text: '无条件'}, {id: 3, text: '从前慢'},
					{id: 4, text: '成都'}, {id: 5, text: '你就不要想起我'}, {id: 6, text: '张学友'},
					{id: 7, text: '张敬轩'}, {id: 8, text: '情书'}, {id: 9, text: '陈奕迅'}
				],
				text: this.keyword,
				searchResult: []
			}
		},
		props: {
			keyword: '',
			hotList: {
				type: Array,
				default: []
			}
		},
		methods: {
			clearSearch () {
				this.text = '';
			},
			search (text) {
				this.text = text || '';
				if(this.text) {
					store.search(this.text).then(resp => {
						var result = resp.data;
						this.searchResult = result.data.song.list || [];
					});
				}
			},
			deleteCurrentHistory (item) {
				this.historyList.splice(this.historyList.indexOf(item), 1);
			}
		}
	}
</script>
<style lang="less">
	@import './../styles/less/mixins.less';
	.m-input {
		padding: 15px 12px;
		.hairline(bottom, #d3d4da, y);
		input {
			width: 100%;
			height: 30px;
			line-height: 18px;
		}
	}
	.m-input-content {
		background: #ebecec;
		width: 100%;
		height: 30px;
		border-radius: 30px;
    padding: 0 30px;
  	box-sizing: border-box;
	}
	.mu-text-field-icon {
		top: 7px;
		font-size: 16px;
	}
	.m-icon-search {
    color: #c9c9c9;
    left: 10px;
	}
	.m-icon-search-cancel {
    color: #c9c9c9;
		right: 10px;
		left: initial;
	}
	.m-icon-history, .m-icon-delete {
		font-size: 16px;
	}
	.m-icon-history {
		left: 12px;
	}
	.m-icon-delete {
		right: 12px;
	}
	section {
		h3{
	    font-size: 12px;
    	line-height: 12px;
    	color: #666;
    	padding-left: 12px;
    }
	}
	.m-hotlist, .m-matchlist {
		padding-top: 15px;
	}
	.m-hotlist {
    >div {
    	padding-left: 12px;
    	padding-top: 12px;
    	padding-bottom: 6px;
    }
	}
	.m-history {
		.mu-item.show-left {
			padding-left: 48px;
		}
		.mu-item.show-right {
			padding-right: 48px;
			.mu-item-right {
				right: 0;
			}
		}
	}
	.chip {
		margin-right: 8px;
		margin-bottom: 8px;
		background-color: transparent;
		border: 1px solid #d3d4da;
		&.hover, &.active {
			background: rgba(230, 230, 230, .5);
			box-shadow: none;
		}
	}
</style>