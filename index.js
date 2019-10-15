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

// Create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(' +
              'id int AUTO_INCREMENT, ' +
              'title VARCHAR(255), ' +
              'body VARCHAR(255), ' +
              'PRIMARY KEY(id) )';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Posts table created...')
  });
});

// Create post 1
app.get('/addpost1', (req, res) => {
  let post = { title: 'Post One', body: 'This is post number one.' };
  let sql = 'INSERT INTO posts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Post 1 added...')
  });
});

// Create post 2
app.get('/addpost2', (req, res) => {
  let post = { title: 'Post Two', body: 'This is post number two.' };
  let sql = 'INSERT INTO posts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Post 2 added...')
  });
});

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send('Posts fetched...')
  });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Post fetched...')
  });
});

// Update
app.get('/updatepost/:id', (req, res) => {
  let newTitle = `Updated Title for post ${req.params.id}`
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Post fetched...')
  });
});

// Delete
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Post deleted...')
  });
});

app.listen('3000', () => {
  console.log("nodejsMySQL server listening on port 3000");
});
