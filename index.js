const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/bookreviews.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS users (
    userID INTEGER PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    email VARCHAR,
    role TEXT DEFAULT 'user'
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
    bookurl VARCHAR,
    typeID INTEGER
)`);
db.run(`CREATE TABLE IF NOT EXISTS types (
    typeID INTEGER PRIMARY KEY,
    typename VARCHAR
)`);

app.use(express.json());

// users
app.get('/user', (req,res) => {
    db.all(`SELECT * FROM users`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.post('/user', (req,res) => {
    const user = req.body;
    db.run(`INSERT INTO users (username,password,email) VALUES (?,?,?)`, user.username, user.password, user.email, function(err) {
        if (err) res.status(500).send(err);
        else {
            user.userID = this.lastID;
            res.send(user); 
        }
    });
});

app.put('/user_role/:userID', (req,res) => {
    const user = req.body;
    db.run(`UPDATE users SET role = ? WHERE userID = ?`, user.role, req.params.userID, function(err) {
        if (err) res.status(500).send(err);
        else res.send(user);
    });
});

// books
app.get('/book', (req,res) => {
    db.all(`SELECT * FROM books`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/book/:bookID', (req,res) => {
    db.get(`SELECT * FROM books WHERE booksID = ?`, req.params.bookID, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.post('/book', (req,res) => {
    const book = req.body;
    db.run(`INSERT INTO books (title,author,price,bookurl,typeID) VALUES (?,?,?,?,?)`, book.title, book.author, book.price, book.bookurl, book.typeID, function(err) {
        if (err) res.status(500).send(err);
        else {
            book.typeID = this.lastID;
            res.send(book); 
        }
    });
});

// types
app.get('/type', (req,res) => {
    db.all(`SELECT * FROM types`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.post('/type', (req,res) => {
    const type = req.body;
    db.run(`INSERT INTO types (typename) VALUES (?)`, type.typename, function(err) {
        if (err) res.status(500).send(err);
        else {
            type.typeID = this.lastID;
            res.send(type); 
        }
    });
});

// join book - type
app.get('/magazine/:typeID', (req,res) => {
    db.all(`SELECT types.*, books.* FROM types JOIN books ON types.typeID = books.typeID WHERE types.typeID = ?`, req.params.typeID, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/psychology/:typeID', (req,res) => {
    db.all(`SELECT types.*, books.* FROM types JOIN books ON types.typeID = books.typeID WHERE types.typeID = ?`, req.params.typeID, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/cartoon/:typeID', (req,res) => {
    db.all(`SELECT types.*, books.* FROM types JOIN books ON types.typeID = books.typeID WHERE types.typeID = ?`, req.params.typeID, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));