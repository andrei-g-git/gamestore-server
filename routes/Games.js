const { response } = require("express");

const getPopular = (app, db) => {
    app.get("/api/popular", (req, res) => {
        const sql = `SELECT id, title, header_image, price, discount_percent, is_free 
            FROM games 
            ORDER BY followers DESC
            LIMIT 14;
        ` 
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });
}

const getFree = (app, db) => {
    app.get("/api/free", (req, res) => {
        const sql = `SELECT id, title, header_image, price, discount_percent, is_free
            FROM games
            WHERE is_free = 1
            LIMIT 14;
        ` 
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });
}

const getNew = (app, db) => {
    app.get("/api/new", (req, res) => {
        const sql = `SELECT id, title, header_image, price, discount_percent, is_free
            FROM games
            ORDER BY release_date DESC
        ` 
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send(result);
        });
    });
}

const getById = (app, db) => {
    //app.get("api/games/:id", (req, res) => {
    app.post("/api/games", (req, res) => {
        //const id = req.params.id;
        const id = req.body.id;
        console.log(id);
        const sql = `SELECT * 
            FROM games
            WHERE id=${id}
        `;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    });
}

const getPicsById = (app, db) => {
    app.post(("/api/games/pics"), (req, res) => {
        const id = req.body.id;
        const sql = `SELECT pic_1, pic_2, pic_3
            FROM pics
            WHERE id=${id}
        `;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
    });
}

const search = (app, db) => {
    app.post("/api/search", (req, res) => {
        const searchQuery = req.body.searchQuery;
        const sql = `SELECT id, title, header_image, price, discount_percent, is_free
            FROM games
            WHERE MATCH(title)
            AGAINST("${searchQuery}")
        `;
        db.query(sql, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    })
}

module.exports.getPopular = getPopular;
module.exports.getFree = getFree;
module.exports.getNew = getNew;
module.exports.getById = getById;
module.exports.getPicsById = getPicsById;
module.exports.search = search;