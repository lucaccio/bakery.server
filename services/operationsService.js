const { sequelize }  = require('../configs/sequelize');

const{QueryTypes} = require('sequelize')

const getOperations = async function(props) {
    var todayDate = new Date().toISOString().slice(0, 10);
console.log(todayDate);
     const sql = `select o.ID as ID, o.ID_titolo_bancario, o.data_operazione,  \
         tb.descrizione as tipo_titolo , \
         o.contanti ,\
         o.importo_titolo, \
         o.numero_titolo, \
         o.ID_conto_corrente, \
         u.denominazione_stampa as sede,  \
         o.data_operazione,  \
         c.caratura,  \
         c.kt, \
         ob.ID_caratura,  \
         ob.lista_oggetti, \
         ob.peso from operations as o   \
        inner join offices as u on u.ID=o.ID_sede  \
        inner join details_operations as d on o.ID=d.ID_operation \
        inner join objects as ob on ob.ID=d.ID_object \
        inner join carats as c on c.ID=ob.ID_caratura \
        left join titoli_bancari as tb on tb.ID_titolo_bancario=o.ID_titolo_bancario\
        left join banche as b on b.ID_banca=o.ID_conto_corrente  \
        where o.data_operazione between "${todayDate} 00:00:00" and "${todayDate} 23:59:59"
        order by o.data_operazione DESC`;
   //      limit  ${props.limit}`;

        const _results = await sequelize.query(sql,{
            type: QueryTypes.SELECT //evita il risultato doppio
        });

        console.log("operazioni trovate " , _results.length)

        return _results;
};
 


async function get() {
    const sql ="SELECT * FROm operations order by data_operazione desc LIMIT 1 "
    const _results = await sequelize.query(sql, {
        type: QueryTypes.SELECT
    });

    console.log(_results)

    return _results;
}


module.exports = { getOperations, get }