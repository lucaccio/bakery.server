const { sequelize }  = require('../configs/sequelize');

const{QueryTypes} = require('sequelize')

const getAll = async function(props) {


		const sql = "SELECT  * FROM prodotti"


        const _results = await sequelize.query(sql,{
            type: QueryTypes.SELECT //evita il risultato doppio
        });

        return _results;


}

module.exports = { getAll }