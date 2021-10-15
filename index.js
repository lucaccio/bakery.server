require('dotenv').config();
global.reqlib = require('app-root-path').require;
var process = require('process');
process.title = "bakery.server";

var express = require('express');
const cors = require('cors')
const clienti = require('./routes/clientiRoute')
const prodotti = require('./routes/prodottiRoute')
var app = express();

app.use(express.json());
app.use(cors()); 
app.use(clienti);
app.use( prodotti);

app.post('/api/v1/giornaliera', (req, res) => {     
    res.json({
        message: req.body
    })
});




app.get('/', (req, res) => {
    res.json({
        message: 'bakey.server listening'
    })
})
app.listen(process.env.NODE_PORT, () => {
    console.log('bakery server in ascolto')
})
 



 





