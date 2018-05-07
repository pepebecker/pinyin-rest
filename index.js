'use strict'

const convertPinyin = require('pinyin-convert')
const splitPinyin = require('pinyin-split')
const express = require('express')
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
	.catch(err => res.send({ error: err }))
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
	.catch(err => res.send({ error: err }))
})

app.get('/pinyin/:query', (req, res) => {
	if (req.query.split) {
		splitPinyin(req.params.query)
		.then(data => {
			res.send({
				text: data.join(' '),
				data: data
			})
		})
		.catch(err => res.send({ error: err }))
	} else {
		convertPinyin(req.params.query, { segmented: true })
		.then(data => {
			let text = typeof data === 'string' ? data : data.map(part => {
				if (typeof part === 'string') {
					return part
				} else {
					return part[0]
				}
			}).join('')
			res.send({
				text: text,
				data: data
			})
		})
		.catch(err => res.send({ error: err }))
	}
})

app.get('/zhuyin/:query', (req, res) => {
	mdbg.get(req.params.query)
		.then(char => {
			if (char) {
				res.send(Object.keys(char.definitions).reduce((o, pinyin) => {
					o[pinyin] = char.definitions[pinyin].zhuyin
					return o
				}, {}))
			} else {
				res.sendStatus(200)
			}
		})
		.catch(err => res.send({ error: err }))
})

const port = Number(process.env.PORT || 8080)
http.createServer(app).listen(port, ip.address(), err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server running on http://${ip.address()}:${port}`)
})
