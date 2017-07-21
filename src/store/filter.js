import Vue from 'vue'

Vue.filter('highlight', (str, key) => {
	var targetStr = str;
	var pos = str.indexOf(key);
	return targetStr.replace(new RegExp(key, "gm"), "<span class='highlight'>" + key + "</span>");
});