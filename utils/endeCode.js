// 简单的加解密

// 加密
const encode = str => {
	var text = ''
	str = String(str)
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i)
		text += code
		text += ','
	}
	return text
}
// 解密
const decode = str => {
	var arr = str.split(','),
		text = ''
	for (var i = 0; i < arr.length; i++) {
		var code = parseInt(arr[i])
		text += String.fromCharCode(code)
	}
	return text
}

export { encode, decode }
