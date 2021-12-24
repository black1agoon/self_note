### vue cli proxy
```js
devServer: {
		port: 8080,
		proxy: {
			"^/base-platform": {
				target: "https://dispatch.zjsznhl.com.cn", // 接口域名
				changeOrigin: true, //是否跨域
				logLevel: 'debug',
			},
            // 访问  /base-platform/api/xxxx/xxxx 跳转到 https://dispatch.zjsznhl.com.cn/base-platform/api/xxxx/xxxx , /base-platform 会自动添加到 https://dispatch.zjsznhl.com.cn 之后， 所以不需要在 https://dispatch.zjsznhl.com.cn 后面添加


            // "^/base-platform": {
			// 	target: "https://dispatch.zjsznhl.com.cn", // 接口域名
			// 	changeOrigin: true, //是否跨域
			// 	pathRewrite: {
			// 		'^/base-platform': ''
			// 	},
			// 	logLevel: 'debug',
			// },
            // 访问  /base-platform/api/xxxx/xxxx 跳转到 https://dispatch.zjsznhl.com.cn/api/xxxx/xxxx 
		},
	},

```