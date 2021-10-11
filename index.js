require('dotenv').config();
global.reqlib = require('app-root-path').require;
var process = require('process');
process.title = "GM.server";

var express = require('express');
const cors = require('cors')
const opRoute = require('./routes/operationsRoute')
const bancheRoute = require('./routes/bancheRoute')
var app = express();
app.use(cors()); 
app.use(opRoute);
app.use( bancheRoute );
app.get('/', (req, res) => {
    res.json({
        message: 'gm.server listening'
    })
})
app.listen(process.env.NODE_PORT, () => {
    console.log('GM server in ascolto')
})
 



 





