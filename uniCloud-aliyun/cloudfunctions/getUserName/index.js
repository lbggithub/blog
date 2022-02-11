'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('uni-id-users').field({
		'username': true
	}) // 获取表'uni-id-users'的集合对象
	const res = await collection.limit(1).get() // 获取表中的1条数据，结果为json格式
	const data = res.data[0] || {}
	return {
		code: 0,
		...data
	}
}
