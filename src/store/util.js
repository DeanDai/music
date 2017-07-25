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
	},
	convertLrcArr: function (list) {
	    let lrcArr = [];
	    let duration = 0;
	    var arr = list.filter(item => item !== ''); // 移除空字符串
	    for (let i = 0; i < arr.length; i++) {
	        let item = arr[i];
	        let lrcObj = {};
	        let timeStr = item.match("\\[(.+?)\\]")[1];

	        //declude not time
	        if (/[^0-9\.\:]/.test(timeStr)) {
	            continue;
	        }
	        var text = item.split(']')[1].trim();
	        if(!text) {
	        	continue;
	        }

	        let timeArr = timeStr.split(":");
	        let time = parseInt(timeArr[0]) * 60 + parseFloat(timeArr[1]);

	        lrcObj.selected = false;
	        lrcObj.show = true;

	        lrcObj.time = time;
	        // lrcObj.lrc = item.replace(/(\.\d{2,3})/g, '');
	        lrcObj.lrc = text;
	        lrcArr.push(lrcObj);
	    }
	    return lrcArr;
	},
	convertToTime: function(time){
      var min = Math.floor((time / 60) % 60);
      var sec = Math.floor(time % 60);
      var cTime;
      if(sec < 10) {
          sec = '0' + sec;
      }
      if(min<10){
        min='0'+min;
      }
      cTime = min + ':' + sec
      return cTime;
    }
};
window.util = util;