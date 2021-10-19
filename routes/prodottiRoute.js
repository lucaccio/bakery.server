 

var app = require('express')();
const prodottiService = require('../services/prodottiService')


 

     
 app.get('/api/v1/prodotti', async function(req, res, next) {  

    var list = await prodottiService.getAll();
   //console.log(list)
    res.json({
	     count: list.length,
	     data : list,
	     error: false,     
    })   
 });
  
         
 module.exports = app;


