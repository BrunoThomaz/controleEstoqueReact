const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './Cliente')))
app.use(cors())

app.use(morgan('tiny'))

require('./controllers/principal.js')(app)


app.listen(3000, () => {
    console.log('Server listing on http://localhost:3000.')
});