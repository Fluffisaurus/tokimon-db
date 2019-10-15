const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: require
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   var tableQuery = 'SELECT * FROM toki_table';
//   pool.query(tableQuery, (error, result) => {
//     if(error)
//       res.end(error);
//     var results = { 'results': (result) ? result.rows : null};
//     console.log(results);
//     res.render('pages/index', results);
//   });

// });
app.get('/', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM toki_table');
      const results = { 'results': (result) ? result.rows : null};
      // console.log(results);
      res.render('pages/index', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

app.post('/', async (req, res) => {
  console.log("processing...");
  var data = req.body
  // console.log(data);

  // var queryString = `INSERT INTO toki_table VALUES(${data.id}, ${data.name}, ${data.weight}, ${data.height}, ${data.flying}, ${data.fight}, ${data.fire}, ${data.water}, ${data.grass}, ${data.electric}, ${data.ice}, ${data.total}, ${data.trainer})`
  // console.log(queryString);

  //insert query stuff here
  //...
  try{
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO toki_table VALUES(${data.id}, '${data.name}', ${data.weight}, ${data.height}, ${data.flying}, ${data.fight}, ${data.fire}, ${data.water}, ${data.grass}, ${data.electric}, ${data.ice}, ${data.total}, '${data.trainer}')`);
    const results = { 'results': (result) ? result : null};
    console.log(results);
    client.release();

  } catch (err){
    console.error(err);
    // res.status(400).send(JSON.stringify({status: err}));
  }

  
  
  res.status(200).send(JSON.stringify({status: "success"}));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));