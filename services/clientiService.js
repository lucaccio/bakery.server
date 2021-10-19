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


//

//SELECT c.id_cliente, c.denominazione, o.id_prodotto, o.settimanale, g.data, g.consegnato FROM clienti as c  INNER JOIN ordinazioni as o ON o.id_cliente=c.id_cliente   LEFT JOIN giornaliera as g ON g.id_cliente=c.id_cliente WHERE o.id_prodotto=1 AND g.data='2021-10-19'


//SELECT c.id_cliente, c.denominazione, o.id_prodotto, o.settimanale, g.data, g.consegnato ,g.id_prodotto as pro FROM clienti as c  INNER JOIN ordinazioni as o ON o.id_cliente=c.id_cliente   LEFT JOIN giornaliera as g ON g.id_prodotto = o.id_prodotto AND c.id_cliente=g.id_cliente  WHERE o.id_prodotto=1

//select * from ordinazioni o left join giornaliera g on o.id_ordinazione  = g.id_ordinazione where o.id_prodotto=1   and ( g.data='2021-10-19' AND g.data is null)


async function getAllWithProduct(id, mydate) {

    const sql ="SELECT * FROM clienti as c \
    LEFT JOIN giornaliera as g ON g.id_cliente=c.id_cliente\
    INNER JOIN ordinazioni as o ON o.id_cliente=c.id_cliente \
    WHERE o.id_prodotto = ?\
    AND g.data = ?"
    
    console.log(sql)

    const _results = await sequelize.query(sql,  {
        replacements: [id, mydate],
        type: QueryTypes.SELECT
    });

    console.log(_results)

    return _results;
}



module.exports = {  getAll, getAllWithProduct }