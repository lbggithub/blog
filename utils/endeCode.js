// 简单的加解密

// 加密
const encode = str => {
	var encode = ''
	str = String(str)
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i)
		encode += code
		encode += ','
	}
	return encode
}
// 解密
const decode = str => {
	var arr = str.split(','),
		decode = ''
	for (var i = 0; i < arr.length; i++) {
		var code = parseInt(arr[i])
		decode += String.fromCharCode(code)
	}
	return decode
}

export { encode, decode }
