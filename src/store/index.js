import * as R from './../store/api'

var store = {
	getLastest () {
		return R.fetchLatest();
	},
	search (keyword) {
		return R.searchMusic(keyword);
	}
}
window.store = store;
export default store