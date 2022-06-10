const baseUrl = "https://m.meijiavip.com"

export function requestGet(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = baseUrl + `/api`+url.split("/api")[2]
		// #endif
		uni.request({
			url: url,
			method: "GET",
			data: params,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export function requestPost(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		url = baseUrl + url.split("/api")[1]
		// #endif
		uni.request({
			url: url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: params,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
