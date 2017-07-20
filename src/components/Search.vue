<template>
	<div class="search-block">
		<form class="m-input m-p-r" action="#" @submit.prevent="search">
			<div class="m-input-content m-p-r">
				<i class="mu-text-field-icon material-icons m-icon-search">search</i>
				<input type="search" name="search" class="input" placeholder="搜索歌手、歌曲" v-model="text" autocomplete="off">
			    <i class="mu-text-field-icon material-icons m-icon-search-cancel">close</i>
			</div>
		</form>
		<div class="m-default">
			<section class="m-hostlist">
				<h3 class="title">热门搜索</h3>
				<ul>
					<mu-chip class="chip" v-for="hot in hostList" :key="hot.id">{{hot.text}}</mu-chip>
				</ul>
			</section>
			<section class="m-history">
				<h3 class="title">历史搜索</h3>
				<ul>
					<li class="m-p-r" v-for="history in historyList" :key="history.id">
							<i class="mu-icon material-icons m-icon-history">history</i>
							<div class="history ellipsis">{{history.text}}</div>
				      <i class="mu-icon material-icons m-icon-delete">close</i>
					</li>
				</ul>
			</section>
		</div>
		<div class="m-search-result">
			<section class="m-matchlist">
				<h3>最佳匹配</h3>
			</section>
			<section class="m-songlist"></section>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				hostList: [
					{id: 1, text: '越过山丘'}, {id: 2, text: '无条件'}, {id: 3, text: '从前慢'},
					{id: 4, text: '成都'}, {id: 5, text: '你就不要想起我'}, {id: 6, text: '张学友'},
					{id: 7, text: '张敬轩'}, {id: 8, text: '情书'}, {id: 9, text: '陈奕迅'}
				],
				historyList: [
					{id: 1, text: '越过山丘'}, {id: 2, text: '无条件'}, {id: 3, text: '从前慢'},
					{id: 4, text: '成都'}, {id: 5, text: '你就不要想起我'}, {id: 6, text: '张学友'},
					{id: 7, text: '张敬轩'}, {id: 8, text: '情书'}, {id: 9, text: '陈奕迅'}
				],
				text: this.keyword
			}
		},
		props: {
			keyword: ''
		},
		methods: {
			search () {
				store.search(this.text).then(resp => {
					var result = resp.data;
					console.log(result);
				});
				
			}
		}
	}
</script>
<style lang="less">
	@import './../assets/less/mixins.less';
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
    }
	}
	.m-hostlist {
    padding: 15px 12px 0;
    ul {
    	padding-top: 12px;
    	padding-bottom: 6px;
    }
	}
	.m-history {
		h3 { padding-left: 12px; }
		.history {
			height: 44px;
			line-height: 44px;
	    margin-left: 40px;
	    margin-right: 40px;
    	text-align: left;
    	.hairline(bottom, #d3d4da, y);
		}
		ul>li {
			>i {
				position: absolute;
				top: 14px;
				color: #d3d4da;
				font-size: 16px;
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