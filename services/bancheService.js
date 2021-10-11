const { sequelize }  = require('../configs/sequelize');

const{QueryTypes} = require('sequelize')

const elencoTitoli = async function(props) {


		const sql = "SELECT  * FROM titoli_bancari"


        const _results = await sequelize.query(sql,{
            type: QueryTypes.SELECT //evita il risultato doppio
        });

        return _results;


}

module.exports = { elencoTitoli }