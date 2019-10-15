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

//handles on load
app.get('/', async (req, res) => {
  //query function format from heroku getting started https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
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

//handle insert
app.post('/', async (req, res) => {
  console.log("processing insert...");
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
  console.log("insert successful");
  res.status(200).send(JSON.stringify({status: "insert successful"}));
});


//handle delete
app.post('/delete', async (req, res) =>{
  console.log("processing delete...");
  var data = req.body
  console.log(data);

  try{
    const client = await pool.connect();
    const result = await client.query(`DELETE FROM toki_table WHERE id=${data.id} AND name='${data.name}' AND trainer='${data.trainer}'`);
    const results = { 'results': (result) ? result : null};
    console.log(results);
    client.release();

  } catch (err){
    console.error(err);
    // res.status(400).send(JSON.stringify({status: err}));
  }
  console.log("delete successful");
  res.status(200).send(JSON.stringify({status: "delete successful"}));
});


//handle inspect pages
app.get('/details/:id', async (req, res) => {
  let keyID = req.params.id; //gives id portion in url
  keyData = keyID.split('-'); 

  //query to get info based on url in database
  try {
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM toki_table WHERE id=${keyData[0]} AND name='${keyData[1]}' AND trainer='${keyData[2]}'`);
    const results = { 'results': (result) ? result.rows : null};
    // console.log(results);
    res.render('pages/toki-details', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
  
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));