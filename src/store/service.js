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
	})()
};
window.S = window.service = service;
export default service;