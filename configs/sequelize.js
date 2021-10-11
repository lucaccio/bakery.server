const { Sequelize, DataTypes,  } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

  
try {

  var logsPath = __dirname + '/../logs/';
   
  if( !fs.existsSync(logsPath) ) {
    fs.mkdirSync(logsPath);
  }
  var stream = fs.createWriteStream(logsPath + "/query.log", {flags:'a'});

} catch(e) {

  console.error(e)

}


// array msg
function writeLogToFile(msg) {
  try {  
    const _msg = msg[0];
    //const _oggettoSequelize = msg[1];
    var date = new Date().toISOString();
    stream.write( date + " ");    
    stream.write(_msg + "\n\n");

  } catch(e) {
    console.log(e)
    stream.end();
  }  
}




//configurazione per il database goldmanager
const sequelize = new Sequelize( 
          process.env.MYSQL_MASTER_DB, 
          process.env.MYSQL_MASTER_USER,
          process.env.MYSQL_MASTER_PASS, 
   {
    host:    process.env.MYSQL_MASTER_HOST,
    dialect: 'mysql', 
    
    pool: {
      max: parseInt(process.env.MYSQL_MASTER_DB_POOL_MAX),      
      min: parseInt(process.env.MYSQL_MASTER_DB_POOL_MIN),  
      acquire: 30000,
      idle: 10000,
      evict: 1000
   },
   
    dialectOptions: {
    //  useUTC: true,
    //  timezone: '+02:00',
     //  useUTC: false, //for reading from database
     //  dateStrings: true,

       // timezone: "Europe/Rome",
   //   timezone: 'Etc/GMT+1',  // risolve il problema del warning IANA
  },
  //useUTC: false,
 // timezone: '+02:00',
  timezone:  "Europe/Rome",
  reconnect: true,
  logging:   console.log,  
});



//const sequelizeTest = sequelize


const sequelizeTest = new Sequelize( 
  process.env.MYSQL_SERVICE_DB, 
  process.env.MYSQL_SERVICE_USER,
  process.env.MYSQL_SERVICE_PASS, 
  {
    host:     process.env.MYSQL_SERVICE_HOST,  
    dialect: 'mysql',
     
    pool: {
      max: parseInt(process.env.MYSQL_SERVICE_DB_POOL_MAX),      
      min: parseInt(process.env.MYSQL_SERVICE_DB_POOL_MIN),   
      acquire: 30000,
      idle: 10000, //connessioni inattive
      evict: 1000
    },
 
    dialectOptions: {
      //useUTC: true,
    //timezone: "Europe/Rome", // timezone: 'Etc/GMT+2', // risolve il problema del warning IANA
    // timezone: 'Etc/GMT+1'
    },
    timezone: '+01:00',
    //timezone: "Europe/Rome",
    //timezone: 'Etc/GMT+1',
    //timezone: "Europe/Rome", //pare sia invalido
    reconnect:true,
    logging: (...msg) => writeLogToFile(msg),  
});


const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection in [GOLDMANAGER] server has been established successfully.');
    //    await sequelizeTest.authenticate();
     //   console.log(`DB connection in [${process.env.NODE_ENV}] server mode has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the databases:', error);
    }
}


const connectionTest = async () => {
  console.log("connect seq test")
  try {     
      console.log('Connection [TEST] has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database TEST:', error);
  }
}


connection();
//connectionTest()

module.exports = { sequelize,  DataTypes } ;



