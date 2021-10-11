 

var app = require('express')();
const bancheService = require('../services/bancheService')


//const ctrl = require('../controllers/bancheController');

     
 app.get('/api/v1/banche/titoli', async function(req, res, next) {  
    var list = await bancheService.elencoTitoli();
    res.json({
	     count: list.length,
	     message : list,
	     error: false,     
    })   
 });
  
         
 module.exports = app;


