<template>
	<mu-popup position="left" :open="open" popupClass="popup-left" @close="close('left')">
		this is content
  	</mu-popup>
</template>
<script>
	export default {
		props: {
			open: false
		},
		name: 'leftSide',
		methods: {
			close () {
		      this.$emit('slideToggle', 'close');
		    }
		}
	}
</script>
<style>
	.popup-left {
	  display: flex;
	  width: 85%;
	  max-width: 375px;
	  height: 100%;
	  align-items: center;
	  padding: 24px;
	}
</style>