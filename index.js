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

app.get('/', function (req, res) {
	const path = __dirname + '/README.md'
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.log(err)
		}
		res.send(marked(data.toString()))
	})
})

app.get('/hanzi/:query', function (req, res) {
	findHanzi(req.params.query, req.query).then((data) => res.send(data), (error) => res.send(error))
})

app.get('/pinyin/:query', function (req, res) {
	if (req.query.split) {
		splitPinyin(req.params.query).then((data) => res.send(data), (error) => res.send(error))
	} else {
		convertPinyin(req.params.query, req.query).then((data) => res.send(data), (error) => res.send(error))
	}
})

const port = Number(process.env.PORT || 8080)
http.createServer(app).listen(port, ip.address(), (error) => {
	if (error) {
		console.error(error)
		process.exit(1)
	}

	console.log(`Server running on http://${ip.address()}:${port}`)
})
