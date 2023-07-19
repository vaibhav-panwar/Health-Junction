const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.mongoURL);

module.exports = {connect}