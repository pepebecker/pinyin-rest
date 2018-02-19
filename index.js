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
	const char = mdbg.get(req.params.query)
	if (char) {
		res.send(char)
	} else {
		res.sendStatus(200)
	}
})

app.get('/definition/:query', (req, res) => {
	const char = mdbg.get(req.params.query)
	if (char) {
		res.send(Object.keys(char.data).reduce((o, pinyin) => {
			o[pinyin] = char.data[pinyin].definitions
			return o
		}, {}))
	} else {
		res.sendStatus(404)
	}
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
		.catch(err => {
			res.send({error: err})
		})
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
		.catch(err => {
			res.send({error: err})
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
