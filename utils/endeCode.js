// 加密
const encode = (str, xor = 50, hex = 10) => {
	let resultList = []
	hex = hex <= 25 ? hex : hex % 25
	for (let i = 0; i < str.length; i++) {
		let charCode = str.charCodeAt(i)
		charCode = (charCode * 1) ^ xor
		charCode = charCode.toString(hex)
		resultList.push(charCode)
	}
	let splitStr = String.fromCharCode(hex + 97)
	let resultStr = resultList.join(splitStr)
	return resultStr
}

// 解密
const decode = (str, xor = 50, hex = 10) => {
	let strCharList = []
	let resultList = []
	hex = hex <= 25 ? hex : hex % 25
	let splitStr = String.fromCharCode(hex + 97)
	strCharList = str.split(splitStr)
	for (let i = 0; i < strCharList.length; i++) {
		let charCode = parseInt(strCharList[i], hex)
		charCode = (charCode * 1) ^ xor
		let strChar = String.fromCharCode(charCode)
		resultList.push(strChar)
	}
	let resultStr = resultList.join('')
	return resultStr
}

export { encode, decode }
