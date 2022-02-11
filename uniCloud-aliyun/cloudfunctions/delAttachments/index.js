'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const dbCmd = db.command

	// 先删除记录
	await db.collection('attachments').where({
		url: dbCmd.in(event)
	}).remove()

	// 再删除文件
	let res = await uniCloud.deleteFile({
		fileList: event
	})

	return { data: res, code: 0 }
}
