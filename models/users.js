const mongoose = require('mongoose');

module.exports = mongoose.model('users', { uname: String, pwd: String });
