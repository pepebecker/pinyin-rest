'use strict'

const convertPinyin = require('pinyin-converter')
const splitPinyin = require('pinyin-split')
const findHanzi = require('find-hanzi')
const express = require('express')
const app = express()

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

const port = Number(process.env.PORT || 5000)
app.listen(port, () => console.log("Listening on " + port))
