const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Why no title?'] 
    },
    body: {
        type:  String,
        required: [true, 'Why no words?'] 
    },
    user: {
        type:  String,
        required: [true, 'Why so shy?']
    },
    likes: {
        type: Number,
        default: 0
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;