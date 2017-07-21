import * as R from './../store/api'

var store = {
	getLastest () {
		return R.fetchLatest();
	},
	search (keyword) {
		return R.searchMusic(keyword);
	},
	getHot () {
		return R.fetchHot();
	}
}
window.store = store;
export default store