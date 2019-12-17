const db = require('../models');
//Call in Axios to do our gets and such:
const axios = require('axios');
//Cheerio, the thing that will do the scraping:
const cheerio = require('cheerio');
//Trim the whitespace from the front of the title:
//const strTrim = require('../public/js/strTrim');

//Call in the app defined in server.js
module.exports = function (app) {

    //-------------- ARTICLE SEARCH AND POPULATE --------------
    //Just get and display the homepage with articles:
    app.get('/', function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                let articles = {
                    article: dbArticles
                }
                console.log(articles);
                res.render('index', articles);
            })
            .catch(function (error) {
                res.status(401).json(error);
            })
    });

    //When we want to comment, you need to grab the specific article you would like to comment on
    //This path does this:
    app.get('/article/:id', function(req,res){
        db.Article.findOne({_id: req.params.id})
        .populate('note')
        .then(function(dbArticle){
            //Just return something:
            res.json(dbArticle);
        })
        .catch(function (error) {
            res.status(401).json(error);
        })
    })

    //Do the web scrapin' of Billy Penn, for Articles::
    app.get('/scrape', function (req, res) {
        axios.get('https://billypenn.com/categories/news/').then(function (response) {
            //Use cheerio to parse the html from Billy Penn:
            let $ = cheerio.load(response.data);
            $("article h1").each(function (i, element) {
                //Create an object to store our title and link in:
                const result = {};

                //Populate the text and link from the Billy Penn site to the empty result object:
                result.title = $(this).children('a').text().trim();
                result.link = $(this).children('a').attr('href');

                //Create the article in the database:
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                        //res.render('index', dbArticle);
                    }).catch(function (error) {
                        res.status(401).json(error);
                    })
            })
        })
        res.send('Done scrapin\'');
    })

    //Post comment to article:
    app.post('/article/:id', function (req, res) {
        db.Comment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(function (dbArticle) {
                let articles = {
                    article: dbArticle
                }
                res.render('index', articles);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

}