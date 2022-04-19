const mongoose = require('mongoose');
const validator = require('validator')

const BlogSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        default: null
    },
    blog: {
        title: {
            type: String,
            required: [true, 'Title is Required'],
            unique: [true, 'Title will be unique'],
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    }
})

// new collection ====>modal
const Blog = new mongoose.model('Blog', BlogSchema);

module.exports = Blog;
// const mongoose = require('mongoose');
// const validator = require('validator')

// const UserSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         minlength: 3
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: [true, 'Email Already Present'],
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid Email')
//             }
//         }
//     },
//     phone: {
//         type: Number,
//         min: 10,
//         required: true,
//         unique: true
//     }
// })

// // new collection ====>modal
// const User = new mongoose.model('User', UserSchema);

// module.exports = User;