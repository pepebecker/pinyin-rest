'use strict'

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

app.get('/hanzi/:query', (req, res) => {
	mdbg.get(req.params.query)
	.then(char => {
		if (char) {
			res.send(char)
		} else {
			res.sendStatus(200)
		}
	})
	.catch(err => res.send({ error: err.message }))
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

const convertToPinyin = query => {
	return convertPinyin(query, { segmented: true })
	.then(data => ({
		text: typeof data === 'string' ? data : data.map(part => {
			if (typeof part === 'string') {
				return part
			} else {
				return part[0]
			}
		}).join(''),
		data: data
	}))
}

app.get('/pinyin/:query', (req, res) => {
	if (req.query.split) {
		splitPinyin(req.params.query)
		.then(data => {
			res.send({
				text: data.join(' '),
				data: data
			})
		})
		.catch(err => res.send({ error: err.message }))
	} else {
		convertToPinyin(req.params.query)
		.then(data => res.send(data))
		.catch(err => res.send({ error: err.message }))
	}
})

app.get('/zhuyin/:query', (req, res) => {
	mdbg.get(req.params.query)
	.then(data => {
		if (Array.isArray(data)) data = data[0]
		if (data) {
			res.send({
				text: Object.values(data.definitions)[0].zhuyin
			})
		} else {
			res.sendStatus(200)
		}
	})
	.catch(err => {
		if (err.type === 'NotFoundError') {
			convertToPinyin(req.params.query)
			.then(data => zhuyin(data.text))
			.then(parts => ({ text: parts.join(' ') }))
			.then(data => res.send(data))
		} else {
			return err
		}
	})
	.catch(err => res.send({ error: err.message }))
})

const port = Number(process.env.PORT || 8080)
http.createServer(app).listen(port, ip.address(), err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server running on http://${ip.address()}:${port}`)
})
