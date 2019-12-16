//Just the server. Don't do any routing in here. 
//Define some variables and call in some dependencies:
const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = requrie('mongoose');
//Call in Axios to do our gets and such:
const axios = require('axios');
//Cheerio, the thing that will do the scraping:
const cheerio = require('cheerio');
//Call our data models:
const db = require('./models');
//Set up our app:
const app = express();

//Set up some middleware:

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//Define our port:
const PORT = process.env.PORT || 3000;

//Set up handlebars templating:
app.engine(
    "handlebars",

    exphbs({
        defaultLayout: 'main',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');

//Call our routes: 
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Listen to our port:
app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });