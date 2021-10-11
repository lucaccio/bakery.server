
var app = require('express')();
const operationsService = require('../services/operationsService')


const ctrl = require('../controllers/operationsController');


app.get('/api/v1/operations', async (req, res, next) => {
   await ctrl.getTodayOperations(req, res, next)
});
     
 app.get('/api/v1/ope', async function(req, res, next) {  
    var list = await operationsService.get();
    res.json({
     message : list,
     error: false,     
   })   
 });
  
         
 module.exports = app;