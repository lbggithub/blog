'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database()
	
	let res = await db.collection('labels').get()
	
	return { data: res.data, code: 0 }
}
