const { sequelize }  = require('../configs/sequelize');

const{QueryTypes} = require('sequelize')



const saveOrUpdate = async (dataToSave) => {

	try {
		const {id_cliente, id_prodotto, data , consegnato} = dataToSave;

		const find = "SELECT * FROM giornaliera WHERE id_cliente = ? AND id_prodotto = ? AND data = ?"
	    let _results = await sequelize.query(find, {
	    	replacements: [ id_cliente, id_prodotto, data ],
	        type: QueryTypes.SELECT
	    });

	 
	    if(_results.length) {

	    	const update = "UPDATE giornaliera SET quantita = ? WHERE id_giornaliera = ?";

	    	let _update = await sequelize.query(update, {
	    		replacements: [ consegnato, _results[0].id_giornaliera ],
	        	type: QueryTypes.UPDATE
	    	});

			console.log(_update)
			return _update

	    } else {
	    	const insert = "INSERT INTO giornaliera (id_cliente,id_prodotto,data,consegnato) VALUES(?,?,?,?)"
			let _insert = await sequelize.query(insert, {
	    		replacements: [ id_cliente, id_prodotto, data, consegnato ],
	        	type: QueryTypes.INSERT
			});

			console.log(_insert)
			return _insert
	    }

	} catch(err) {
		return err;
	} 
}



const getByDate = ({date}) => {

} 




module.exports = { saveOrUpdate , getByDate}