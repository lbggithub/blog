import { UndoAlt, RedoAlt, ExpandArrowsAlt, Bold, Underline, Italic, Strikethrough, Heading, QuoteLeft, ListOl, ListUl, Minus, Mixer, Code, Link, Image, SquareRootAlt, Subscript, Superscript, FileImage } from '@vicons/fa'

export const tools = [{
		icon: h(Bold),
		start: '**',
		end: '**'
	},
	{
		icon: h(Underline),
		start: '<u>',
		end: '</u>'
	},
	{
		icon: h(Italic),
		start: '*',
		end: '*'
	},
	{
		icon: h(Strikethrough),
		start: '~~',
		end: '~~'
	},
	{
		icon: h(Heading),
		list: [{
				name: '一级标题',
				start: '# '
			},
			{
				name: '二级标题',
				start: '## '
			},
			{
				name: '三级标题',
				start: '### '
			},
			{
				name: '四级标题',
				start: '#### '
			},
			{
				name: '五级标题',
				start: '##### '
			},
			{
				name: '六级标题',
				start: '###### '
			}
		]
	},
	{
		icon: h(QuoteLeft),
		start: '> '
	},
	{
		icon: h(ListOl),
		start: '1. '
	},
	{
		icon: h(ListUl),
		start: '- '
	},
	{
		icon: h(Minus),
		start: '\n------------\n'
	},
	{
		icon: h(Mixer),
		start: '`',
		end: '`'
	},
	{
		icon: h(Code),
		start: '```language\n',
		end: '\n```'
	},
	{
		icon: h(Link),
		show: 'link',
		title: '添加链接'
	},
	{
		icon: h(Image),
		show: 'image',
		title: '添加图片',
	},
	{
		icon: h(FileImage),
		show: 'images',
		title: '附件库',
	},
	{
		icon: h(SquareRootAlt),
		list: [{
				name: '行内公式',
				start: '$',
				end: '$'
			},
			{
				name: '块级公式',
				start: '$$\n',
				end: '\n$$'
			}
		]
	},
	{
		icon: h(Subscript),
		start: 'A~b~'
	},
	{
		icon: h(Superscript),
		start: 'A^b^'
	},
]