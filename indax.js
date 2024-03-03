const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/bookreviews.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS users (
    userID INTEGER PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    email VARCHAR
)`);
db.run(`CREATE TABLE IF NOT EXISTS reviews (
    reviewID INTEGER PRIMARY KEY,
    userID INTEGER,
    bookID INTEGER,
    comment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
db.run(`CREATE TABLE IF NOT EXISTS books (
    bookID INTEGER PRIMARY KEY,
    title VARCHAR,
    author VARCHAR,
    price DOUBLE,
    typeID INTEGER
)`);
db.run(`CREATE TABLE IF NOT EXISTS types (
    typeID INTEGER PRIMARY KEY,
    typename VARCHAR,
)`);

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));