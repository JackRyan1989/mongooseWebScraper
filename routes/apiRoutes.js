const db = require('../models');
//Call in Axios to do our gets and such:
const axios = require('axios');
//Cheerio, the thing that will do the scraping:
const cheerio = require('cheerio');

//Call in the app defined in server.js
module.exports = function (app) {
    app.get('/', function (req, res) {
        try {
            res.render('index');
        } catch (error) {
            res.status(401).json(error);
        }
    });

};