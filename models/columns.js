const mongoose = require('mongoose');

module.exports = mongoose.model('columns', { colname: String, bid: String });