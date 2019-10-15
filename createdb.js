/*
  Sample Node.js code to use MySQL.

  Adapted from tutorial code on Travesy Media YouTube video
    "Using MySQL with Node.js"

  Sig Nin
  October 14, 2019
  License: ISC
*/

const express = require('express');
const mysql = require('mysql');

// Create DB connection

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'tester',
  password : 'probador!Oct14!',
  database : 'nodejsMySQL'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

const app = express();

// Create DB
app.get('/createdb', () => {
  let sql = 'CREATE DATABASE nodejsMySQL';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    result.send('Database created...');
  });
});

app.listen('3000', () => {
  console.log("nodejsMySQL server listening on port 3000");
});
