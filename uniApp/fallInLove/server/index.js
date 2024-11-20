const baseUrl = 'http://localhost:3000/rainbow'


uni.addInterceptor('request',{
	invoke(options) {
		if(!options.url.startsWith('http')) {
			options.url = baseUrl+options.url
		}
		
		options.timeout = 10000
	}
})