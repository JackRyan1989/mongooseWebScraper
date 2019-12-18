const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    //Need to link the comments to our article, hence code below:
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;