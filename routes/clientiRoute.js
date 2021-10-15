
var app = require('express')();
const clientiService = require('../services/clientiService')


const ctrl = require('../controllers/clientiController');


app.get('/api/v1/clienti', async (req, res, next) => {
   var list = await ctrl.getAll(req, res, next)
    res.json({
        data : list,
        error: false,     
      })   
 });

app.get('/api/v1/clienti/prodotti/:id', async (req, res, next) => {
   var list = await clientiService.getAllWithProduct(req.params.id)
   var data = new Date();
    res.json({
        timestamp: data.getTime(),
        count: list.length,
        data : list,
        error: false,     
      })   
 });

 
     
 app.get('/api/v1/clienti/:1d', async function(req, res, next) {  
    var list = await clientiService.get();
    res.json({
     data : list,
     error: false,     
   })   
 });
  
         
 module.exports = app;