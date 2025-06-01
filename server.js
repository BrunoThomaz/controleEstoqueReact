const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./db')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use(express.static(path.join(__dirname, 'clientreact/build')));

app.use(morgan('tiny'))

require('./controllers/armarios.js')(app)
require('./controllers/movimentacoes.js')(app)
require('./controllers/importacao.js')(app)


app.listen(3001, () => {
    console.log('Server listing on http://localhost:3001.')
});