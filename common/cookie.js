function getCookies(){
	let result = null
	uni.getStorage({
	    key: 'cookie',
	    success: function (res) {
	       result =  res.data
	    }
	});
	return result
}



export default {
	getCookies
}