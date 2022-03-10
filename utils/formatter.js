// 格式化表格数据
import dayjs from 'dayjs'
// 时间
const date = (row, column, cellValue, index) => {
	if (cellValue) {
		return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
	} else {
		return dayjs(row).format('YYYY-MM-DD HH:mm')
	}
}

// 数组
const arr = (row, column, cellValue, index) => {
	return cellValue.join('，')
}

export { date, arr }
