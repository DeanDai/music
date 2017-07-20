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
	}
}

export function fetchLatest () {
	var p = Vue.http.jsonp(qqMusicApi.latest.url,{params: qqMusicApi.latest.params(), jsonpCallback: 'JsonCallback'});
    p.then(resp => {
        console.log(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}

export function searchMusic (keyword) {
	var p = Vue.http.get(musicApi.search.url, {params: musicApi.search.params(keyword)});
    p.then(resp => {
        console.log(resp.data);
    }, resp => {
        console.log("request error");
    });
    return p;
}