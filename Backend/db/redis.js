const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    password: process.env.redisPass,
    socket: {
        host: process.env.redisURL,
        port: process.env.redisPort
    }
});

const redisConnect = client.connect();

module.exports = { client, redisConnect }
