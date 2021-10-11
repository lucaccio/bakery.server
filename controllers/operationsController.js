  
require('dotenv').config(); 

const { DateTime } = require("luxon");
 
const logger =  reqlib('/libs/logger'); 

const operationsService = require('../services/operationsService')


// logga sql sequelize
const logga = (msg) => { 
    var active =  process.env.LOG_SEQUELIZE_SQL || "false";   
     if(active === "true") {
        console.log(new Date() + " : " + msg);
     }       
}


const getTodayOperations = async function(req, res, next) {  
    var list = await operationsService.getOperations();
    res.json({
     count: list.length,
     message : list,
     error: false,     
   })   
 }

 
module.exports = {getTodayOperations}