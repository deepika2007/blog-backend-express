const mongoose = require('mongoose');
const validator = require('validator')

const BlogSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
    },
    title: {
        type: String,
        // required: [true, 'Title is Required'],
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },

})

const Blog = new mongoose.model('Blog', BlogSchema);

module.exports = Blog;