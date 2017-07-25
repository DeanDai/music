import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

var musicApi = {
	search: {
		url: 'v2/music/search',
	    params: (keyword) => {
	      return {
	      	q: keyword,
	      	count: 20
	      }
	    }
	}
}

var qqMusicApi = {
	latest: {
		url: 'v3/data/hit/hit_newsong.js',
	    params: () => {
	      return {}
	    }
	},
	search: {
		// url: 'fcgi-bin/music_search_new_platform?t=0&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song',
		url: 'soso/fcgi-bin/search_for_qq_cp?format=json&inCharset=utf-8&outCharset=utf-8',
		params: data => {
			return {
				n: data.num,
				w: data.keyword
			}
		}
	},
	hot: {
		url: '/splcloud/fcgi-bin/gethotkey.fcg',
		params: data => {
			return {}
		}
	},
	recommand: {
		url: '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
		params: data => {
			return {}
		}
	},
	lyric: {
		url: '/miniportal/static/lyric/{1}/{0}.xml',
		params: () => {
			return {}
		}
	},
	radioSongList: {
		url: '/v8/fcg-bin/fcg_v8_radiosonglist.fcg?format=json&inCharset=utf-8&outCharset=utf-8&platform=h5',
		params: id => {
			labelid: id
		}
	}
}

export function fetchRecommand () {
	var p = Vue.http.get(qqMusicApi.recommand.url);
    p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function fetchLatest () {
	var p = Vue.http.jsonp(qqMusicApi.latest.url,{params: qqMusicApi.latest.params(), jsonpCallback: 'JsonCallback', scriptCharset: 'GBK'});
    p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function searchMusic (keyword, num = 20) {
	var data = {
		keyword: keyword,
		num: num
	};
	var p = Vue.http.get(qqMusicApi.search.url, {params: qqMusicApi.search.params(data)});
    p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function fetchHot () {
	var p = Vue.http.get(qqMusicApi.hot.url);
    p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function fetchLyric (songId) {
	var url = qqMusicApi.lyric.url.format(songId, songId % 100);
	var p = Vue.http.get(url);
    p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function fetchRadioSongList (radioId) {
	var p = Vue.http.get(qqMusicApi.radioSongList.url, {params: qqMusicApi.radioSongList.params(radioId)});
	p.then(resp => {
        console.info(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}