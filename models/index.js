//Exporting an object containing all of our models:
//This is so that we can have only one import statement in our server:
module.exports = {
    Article: require('./Article'),
    Comment: require('./Comment')
}