const express = require('express');

const mysql = require('mysql');

//console.log(mysql);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "game_store"
});

//console.log(db);

db.connect((err) => {
    if(err) throw err;
    console.log("mysql connected...")
})

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

require('./routes/Games').getPopular(app, db);
require('./routes/Games').getFree(app, db);
require('./routes/Games').getNew(app, db);
require('./routes/Games').getById(app, db);
require('./routes/Games').getPicsById(app, db);
require('./routes/Games').search(app, db);

app.listen(5002, () => console.log("started on port 5002"));