import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

// 轮播图
export const banner = (data) => {
    return http.request({
        url: '/banner/36kr',
        method: 'GET', 
        data,
		// handle:true
    })
}

export const main = (id,index) => {
    return http.request({
        url: 'Api/showf?id='+id+'s&page='+index,
        method: 'GET'
    })
}
// 该方法 不可用 微信只支持 https的协议
export const getClass = () => {
	return http.request({
		baseUrl: 'http://cover.acfunwiki.org/',
		url:'luwei.json?appid=e31c86032f0d607c&__t=1577944306659',
		method: 'GET'
	})
}
export const getInfo = (id,index) =>{
	return http.request({
		baseUrl:'https://nmb.fastmirror.org/',
		url:'Api/thread?id='+id+'&page='+index,
		method: 'GET'
	})
}
// // 发布新串 测试用饼干
// export const postString=(content,id,imge,water)=>{
// 	return http.request({method:'post',
// 	baseUrl:'https://nmb.fastmirror.org/',
// 	url:'Home/Forum/doPostThread.html',
// 	header: {
// 		'Content-Type':'application/json;charset=UTF-8',
// 		'Content-Type':'application/x-www-form-urlencoded',
// 		'Cookie':'userhash=h%3C%EA%FE%E2%81%F0%0D%A8%24%D5%8E%F5u%13%23%0D%B8%D6%60H%CEYE;'
// 	})
// }

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	main,
	getClass,
	getInfo
}