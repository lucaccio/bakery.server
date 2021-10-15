  
require('dotenv').config(); 

const { DateTime } = require("luxon");
 
const logger =  reqlib('/libs/logger'); 

const service = require('../services/clientiService')


// logga sql sequelize
const logga = (msg) => { 
    var active =  process.env.LOG_SEQUELIZE_SQL || "false";   
     if(active === "true") {
        console.log(new Date() + " : " + msg);
     }       
}


const getAll = async function(req, res, next) {  
    var list = await service.getAll();
    res.json({
     count: list.length,
     message : list,
     error: false,     
   })   
 }

 
module.exports = {getAll}