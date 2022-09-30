
// username = qmul
// password = F0r906yr@
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: 'dialogplus.cfyohciwuyqk.us-east-1.rds.amazonaws.com', 
    port: '3306',
    user: 'admin',
    password:'F0r906yr',
    database:'qmul', 
    connectionLimit: 5
});
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