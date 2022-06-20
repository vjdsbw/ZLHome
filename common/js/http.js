const baseUrl = "https://m.meijiavip.com"
export function requestGet(url, params) {
	return new Promise((resolve, reject) => {
	
		// #ifdef MP-WEIXIN || APP-PLUS
		if (url.split("/api").length == 2) {
			url = baseUrl + url.split("/api")[url.split("/api").length - 1]
		} else {
			url = baseUrl + `/api` + url.split("/api")[url.split("/api").length - 1]
		}
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
		if (url.split("/api").length == 2) {
			url = baseUrl + url.split("/api")[url.split("/api").length - 1]
		} else {
			url = baseUrl + `/api` + url.split("/api")[url.split("/api").length - 1]
		}
		// #endif
		uni.request({
			url: url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie': uni.getStorageSync('cookie'),
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
export function requestPostLogin(url, params) {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN || APP-PLUS
		if (url.split("/api").length == 2) {
			url = baseUrl + url.split("/api")[url.split("/api").length - 1]
		} else {
			url = baseUrl + `/api` + url.split("/api")[url.split("/api").length - 1]
		}
		// #endif
		uni.request({
			url: url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: "POST",
			data: params,
			success: function(res) {
				console.log(res);
				uni.setStorageSync('cookie', res.header['Set-Cookie']);
				resolve(res.data)
				
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
