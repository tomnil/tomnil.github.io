# 2019-03-11 Example code to use MySQL from NodeJS

```javascript
const mysql = require('mysql')

console.log("Attempting connect");

const connection = mysql.createConnection({
  host     : '192.168.1.148',
  user     : 'Username',
  password : 'ThePassword',
  database : 'TheDatabaseToUse'
});

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()
```
