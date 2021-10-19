var app = require('express')();
const giornaliera  = require('../services/giornalieraService')


app.post('/api/v1/giornaliera', (req, res) => {     
	
	let result = giornaliera.saveOrUpdate(req.body).then( r => {
		res.json({
			error: false,
        	message: "prodotto aggiornato correttamente"
        })
	}).catch( e => { 
		console.log(e)
		res.json({
			error: true,
        	message: e
        })
	});   
});
module.exports = app;
