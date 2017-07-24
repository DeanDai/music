var util = {
	parseData: function(data) {
		try {
			if (data) {
				return JSON.parse(data);
			}
		} catch (e) {
			var err = '[Parse Error]: ' + e.name + ':' + e.message;
			console.error(err);
			return data;
		}
	},
	cache: function(key, value) {
		try {
			if (arguments.length === 2) {
				return localStorage.setItem(key, JSON.stringify(value));
			} else {
				return JSON.parse(localStorage.getItem(key));
			}
		} catch (e) {
			alert('do not support JSON.parse');
		}
	},
	clearCache: function(key) {
		localStorage.removeItem(key);
	},
	sessionCache: function(key, value) {
		try {
			if (arguments.length === 2) {
				return sessionStorage.setItem(key, JSON.stringify(value));
			} else {
				return JSON.parse(sessionStorage.getItem(key));
			}
		} catch (e) {
			alert('do not support JSON.parse');
		}
	},
	clearSessionCache: function(key) {
		sessionStorage.removeItem(key);
	}
};
window.util = util;