require('dotenv').config();
const winston = require('winston'); 
var appRoot = require('app-root-path');
const { combine, timestamp, label, printf } = winston.format 

const myFormat = printf(({ level, message, label, timestamp }) => {   
    return `${timestamp} [${label}] ${level}: ${message}`;
});
  
const myconsole = new winston.transports.Console({level: 'debug', colorize: true,});

// level debug
const debugFile = new winston.transports.File({ 
  level: "debug",
  filename: `${appRoot}/logs/debug.log`,

});



// creo il logger
const logger = winston.createLogger({
    format: combine(       
        winston.format.splat(), 
        label({ label: process.env.LOG_LABEL || 'gmPmcService' }),
        timestamp( {
          format: 'YYYY-MM-DD HH:mm:ss' 
        //  format:  new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }) 
        }),
        myFormat,
        
      //  winston.format.simple()
      ),
    transports: [
     //   new winston.transports.Console({}) //level info di default ridondante perchè è già dichiarato sopra e inserito sotto
    ]
});

logger
  .add(debugFile)
  .add(myconsole)

module.exports = logger