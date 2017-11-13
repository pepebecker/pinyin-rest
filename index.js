'use strict'

const convertPinyin = require('pinyin-convert')
const splitPinyin = require('pinyin-split')
const findHanzi = require('find-hanzi')
const express = require('express')
const corser = require("corser")
const marked = require('marked')
const http = require('http')
const path = require('path')
const fs = require('fs')
const ip = require('ip')

const app = express()

app.use(corser.create())

app.get('/', (req, res) => {
	const path = __dirname + '/README.md'
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(err)
		}
		res.send(marked(data.toString()))
	})
})

app.get('/hanzi/:query', (req, res) => {
	findHanzi(req.params.query, req.query)
	.then(data => res.send(data))
	.catch(err => res.send(err))
})

app.get('/pinyin/:query', (req, res) => {
	if (req.query.split) {
		splitPinyin(req.params.query)
		.then(data => {
			res.send({
				text: data.join(' '),
				words: data
			})
		})
		.catch(err => {
			res.send({error: err})
		})
	} else {
		convertPinyin(req.params.query, req.query)
		.then(data => {
			res.send({
				text: data
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
