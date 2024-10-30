//Connection with MongoDB with mongoose
const URL_DATABASE = 'mongodb://localhost:27017/controleEstoque'
const mongoose = require('mongoose');

mongoose.connect(URL_DATABASE);
mongoose.Promise = global.Promise;

module.exports = mongoose;