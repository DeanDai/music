import Vue from 'vue'

Vue.filter('highlight', (str, key) => {
	var targetStr = str;
	var pos = str.indexOf(key);
	return targetStr.replace(new RegExp(key, "gm"), "<span class='highlight'>" + key + "</span>");
});

Vue.filter('unicode2asc', str => {
	var sum = '';
	var code = str.match(/&#(\d+);/g);
	if(!code) { return str; }
	if(code.length > 0) {
		code.forEach(item => {
		  sum += String.fromCharCode(item.replace(/[&#;]/g, ''));
		})
		return sum;
	}
});