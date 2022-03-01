// 格式化表格数据
import { h } from 'vue'
import dayjs from 'dayjs'
// 时间
const date = (row, column, cellValue, index) => {
	return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
}

// 数组
const arr = (row, column, cellValue, index) => {
	return cellValue.join('，')
}

export { date, arr }
