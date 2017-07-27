var service = {
	songService: (() => {
		var songInfo = '';
		return {
			getSongInfo: () => songInfo,
			setSongInfo: song => songInfo = song
		}
	})(),
	tabService: (() => {
		var currentTab = '';
		return {
			getCurrentTab: () => currentTab,
			setCurrentTab: tab => currentTab = tab
		}
	})(),
	searchService: (function () {
		var keyword = '';
		var searchHistory = [];
		return {
			setKeyword (searchText) {
				keyword = searchText;
			},
			getKeyword () {
				return keyword;
			},
			getSearchHistory () {
				if(searchHistory.length == 0) {
					return util.cache('s_h_list') || [];
				}
				return searchHistory;
			},
			setSearchHistory (searchHistory) {
				searchHistory = searchHistory;
				util.cache('s_h_list', searchHistory);
			},
			clearSearchHistory () {
				searchHistory = [];
				util.clearCache('s_h_list');
			}
		}
	})()
};
window.S = window.service = service;
export default service;