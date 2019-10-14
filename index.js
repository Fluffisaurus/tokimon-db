const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  var tableQuery = 'SELECT * FROM toki_table';
  pool.query(tableQuery, (error, result) => {
    if(error)
      res.end(error);
    var results = { 'results': (result) ? result.rows : null};
    console.log(results);
    res.render('pages/index', results);
  });

});
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM toki_table');
      const results = { 'results': (result) ? result.rows : null};
      console.log(results);
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));