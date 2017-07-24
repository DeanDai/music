<template>
	<div class="recommand-radio">
		<mu-grid-list>
			<mu-grid-tile v-for="item in list" :key="item.radioid" actionPosition="right" titlePosition="bottom">
		      <img :src="item.picUrl"/>
		      <span slot="title">{{item.Ftitle}}</span>
		      <mu-icon-button icon="play_circle_outline" slot="action"/>
		    </mu-grid-tile>
		</mu-grid-list>
	</div>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
		}
	}
</script>
<style lang="less">
	.recommand-radio {
		padding: 0 12px;
	}
</style>