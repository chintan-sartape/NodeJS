const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db')
var employeeController = require('./controller/employeeController')

var app = express()
// app.use(bodyParser.json())
app.use(express.json())
app.use(cors({ origin: 'http://localhost:4200' }))

port = 3000
app.listen(port, () => console.log(`Server started at port ${port}` ))

app.use('/employees', employeeController)