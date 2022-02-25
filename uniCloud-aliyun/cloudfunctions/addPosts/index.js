'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	const payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}

	const db = uniCloud.database().collection('posts')

	const data = {
		user_id: payload.uid,
		title: event.title,
		abstract: event.abstract,
		categorys: event.categorys,
		labels: event.labels,
		page_view: event.page_view,
		sort: event.sort,
		created_date: event.created_date,
		status: event.status,
		password: event.password,
		thumbnail: event.thumbnail,
		content: event.content,
		html: event.html,
		updated_date: new Date().getTime(),
		is_del: false,
	}

	let res = null
	if (event._id) {
		res = await db.doc(event._id).update(data)
	} else {
		res = await db.add(data)
	}

	return { data: res, code: 0 }
}
