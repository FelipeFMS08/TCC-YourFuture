const mysql = require('mysql');

function createConnection(){
   return mysql.createConnection(
      {
          host: 'localhost',
          user: 'root',
          password: '123456789',
          database: 'db_yourfuture',
          insecureAuth: 'true',
        multipleStatements: 'true'
      }
   );
}

module.exports = function() {
    return createConnection
}