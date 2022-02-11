// 简单的加解密
const password = {}
password.encode = str => { //加密
	var encode = ''
	str = String(str)
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i)
		encode += code
		encode += ','
	}
	return encode
}
password.decode = str => { //解密
	var arr = str.split(','),
		decode = ''
	for (var i = 0; i < arr.length; i++) {
		var code = parseInt(arr[i])
		decode += String.fromCharCode(code)
	}
	return decode
}

export default password
