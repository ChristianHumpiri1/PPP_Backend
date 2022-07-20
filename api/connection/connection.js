const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ppp',
    port: '3306',

});

mysqlConnection.connect( err => {
    if(err){
        console.log('Error de db', err); 
        return;
    }else{
        console.log('Db ok')
    }
});

module.exports = mysqlConnection;