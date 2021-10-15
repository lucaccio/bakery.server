const { sequelize }  = require('../configs/sequelize');

const{QueryTypes} = require('sequelize')

 


async function getAll() {
    const sql ="SELECT * FROM clienti"
    const _results = await sequelize.query(sql, {
        type: QueryTypes.SELECT
    });

    console.log(_results)

    return _results;
}

async function getAllWithProduct(id) {
    const sql ="SELECT * FROM clienti as c INNER JOIN ordinazioni as o ON o.id_cliente=c.id_cliente WHERE o.id_prodotto = ?"
    const _results = await sequelize.query(sql,  {
        replacements: [id],
        type: QueryTypes.SELECT
    });

    console.log(_results)

    return _results;
}



module.exports = {  getAll, getAllWithProduct }