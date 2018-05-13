'use strict'

const pinyinOrHanzi = require('pinyin-or-hanzi')
const hanziToZhuyin = require('hanzi-to-zhuyin')
const convertPinyin = require('pinyin-convert')
const splitPinyin = require('pinyin-split')
const express = require('express')
const zhuyin = require('zhuyin')
const corser = require("corser")
const mdbg = require('mdbg')
const http = require('http')
const path = require('path')
const fs = require('fs')
const ip = require('ip')

const app = express()

app.use(corser.create())

app.get('/', (req, res) => {
	res.send('<a href="https://github.com/pepebecker/pinyin-rest">View GitHub Repository</a>')
})

const getByHanzi = async (text, everything) => {
	const list = []
	let index = 0
	while (index < text.length) {
		let count = text.length - index
		let wordFound = false
		while (count >= 0) {
			const word = text.substr(index, count)
			try {
				const entry = await mdbg.getByHanzi(word)
				wordFound = true
				index += count - 1
				list.push(entry)
				break
			} catch (err) {
				if (err.type !== 'NotFoundError') console.error(err)
			}
			count--
		}

		if (!wordFound && everything) {
			if (index === 0 || typeof list[list.length - 1] === 'object') {
				list.push(text[index])
			} else if (typeof list[list.length - 1] === 'string') {
				list[list.length - 1] += text[index]
			}
		}

		index++
	}
	return list
}
app.get('/hanzi/:query', async (req, res) => {
	const text = req.params.query
	const type = req.query.getBy || pinyinOrHanzi(text)
	let list = []

	if (type === 'mandarin' || type === 'hanzi') {
		list = await getByHanzi(text)	
	}

	if (type.substr(0, 6) === 'pinyin' || type === 'zhuyin') {
		const pinyinList = (type === 'zhuyin' ? zhuyin.toPinyin(text, { numbered: true }) : splitPinyin(text))
		let index = 0
		while (index < pinyinList.length) {
			let count = pinyinList.length - index
			while (count >= 0) {
				const word = pinyinList.slice(index, index + count).join(' ')
				try {
					let entry = null
					if (req.query.getIndex === 'true') entry = await mdbg.getIndexByPinyin(word)
					else entry = await mdbg.getByPinyin(word)
					index += count - 1
					list.push(entry)
					break
				} catch (err) {
					if (err.type !== 'NotFoundError') console.error(err)
				}
				count--
			}
			index++
		}
	}

	res.send(list)
})

app.get('/definition/:query', (req, res) => {
	mdbg.get(req.params.query)
	.then(data => {
		const convert = char => {
			return Object.keys(char.definitions).reduce((o, pinyin) => {
				o[pinyin] = char.definitions[pinyin].translations
				return o
			}, {})
		}
		if (data) {
			if (Array.isArray(data)) res.send(data.map(convert))
			else res.send(convert(data))
		} else {
			res.sendStatus(200)
		}
	})
	.catch(err => res.send({ error: err.message }))
})

const convertToPinyin = async query => {
	const data = await convertPinyin(query, { everything: true, segmented: true })
	const body = {
		text: typeof data === 'string' ? data : data.map(part => {
			if (typeof part === 'string') {
				return part
			} else {
				return part[0]
			}
		}).join('')
	}
	if (typeof data !== 'string') body.data = data
	return body
}

app.get('/pinyin/:query', async (req, res) => {
	const text = req.params.query
	const type = pinyinOrHanzi(text)
	if (type === 'zhuyin') {
		const list = zhuyin.toPinyin(req.params.query, { everything: true })
		res.send({
			text: list.join(''),
			data: list
		})
	}
	if (type.substr(0, 6) === 'pinyin' || type === 'mandarin') {
		if (req.query.split) {
			const list = splitPinyin(req.params.query, true)
			res.send({
				text: list.join(' '),
				data: list
			})
		} else {
			convertToPinyin(req.params.query, { everything: true, segmented: true })
			.then(data => res.send(data))
			.catch(err => res.send({ error: err.message }))
		}
	}
})

app.get('/zhuyin/:query', async (req, res) => {
	const text = req.params.query
	const type = pinyinOrHanzi(text)
	if (type === 'zhuyin') {
		if (req.query.split) {
			const list = zhuyin.split(text, true)
			res.send({
				text: list.join(' '),
				data: list
			})
		} else {
			res.send({ text: text })
		}
	}
	if (type.substr(0, 6) === 'pinyin') {
		const list = zhuyin.fromPinyin(text, true)
		res.send({
			text: list.join(''),
			data: list
		})
	}
	if (type === 'mandarin') {
		const list = await hanziToZhuyin(text, { everything: true, segmented: true })
		res.send({
			text: list.map(item => typeof item === 'string' ? item : item[0]).join(''),
			data: list
		})
	}
})

const port = Number(process.env.PORT || 8080)
http.createServer(app).listen(port, ip.address(), err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server running on http://${ip.address()}:${port}`)
})
