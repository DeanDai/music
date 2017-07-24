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
	},
	getRecommand () {
		return R.fetchRecommand();
	},
	getLyric (id) {
		return R.fetchLyric(id);
	}
}
window.store = store;
export default store