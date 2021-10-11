require('dotenv').config()
const micro = require('micro')
const index = require('./index.js')
const server = micro(index)
server.listen(process.env.NODE_PORT_PROD || 4040);