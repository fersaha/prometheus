const Sequelize = require('sequelize');
const db = new Sequelize('prometheus','timmy','Fers20Mars',{
    host : 'localhost',
    dialect : 'mariadb',
    operatorAliases : false,
    define : {
        timestamps : false
    },
    pool : {
        max : 5,
        min : 0,
        acquire: 3000,
        idle : 10000
    }
});
module.exports = db;