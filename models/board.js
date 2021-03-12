const mongoose = require('mongoose');

module.exports = mongoose.model('board', { bname: String, desc: String, uid: String, shareuid: [String] });
