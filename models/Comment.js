const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type:  String,
        required: [true, 'Why no words?'] 
    },
    user: {
        type:  String,
        required: [true, 'Why so shy?']
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;