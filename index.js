const express = require('express')
const app = express()
const port = 3000
const database = require('./public/database.json')
const fs = require('fs')

const bodyParser = require('body-parser')


app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const db = require('./database')

const routes = require('./routes')
app.use(routes)

app.listen(port, () => console.log(`Secure connection established on port ${port}`))
