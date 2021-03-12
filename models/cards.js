const mongoose = require('mongoose');

module.exports = mongoose.model('cards', {
    cardname: String, colid: String
});