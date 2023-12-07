
// username = qmul
// password = F0r906yr@

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    connectionLimit: 100
});
/*const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'qmul',
    password:'F0r906yr@',
    database:'dialogplus',
    connectionLimit: 5
});*/
module.exports={
    getConnection: function(){
        return new Promise(function(resolve,reject){
            pool.getConnection().then(function(connection){
                resolve(connection);
            }).catch(function(error){
                reject(error);
            });
        });
    }
}
