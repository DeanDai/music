<template>
	<div class="recommand-radio">
		<mu-grid-list>
			<mu-grid-tile v-for="item in list" :key="item.radioid" actionPosition="right" titlePosition="bottom">
		      <img :src="item.picUrl" @click="selectRadio(item.radioid)" />
		      <span slot="title">{{item.Ftitle}}</span>
		      <mu-icon-button icon="play_circle_outline" slot="action"/>
		    </mu-grid-tile>
		</mu-grid-list>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				radioList: []
			}
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectRadio (id) {
				store.getRadioSongList(id).then(resp => {
					var result = resp.data;
					this.radioList = result.data;
					S.radioService.setRadioList(this.radioList);
					this.$router.push('/song/' + this.radioList[0].id);
				});
			}
		}
	}
</script>
<style lang="less">
	.recommand-radio {
		padding: 0 12px;
	}
</style>