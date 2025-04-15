
const express = require("express");
const cors = require("cors");
const app = express();
const ejs = require('ejs');
const db = require('./db')
// let list = require('./Controllers/listController');
let router = require('./Controllers/controller');
let session = require('express-session')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "kyaw123",
    resave: false,
    saveUninitialized: true
}));



router(app);
// list(list);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
