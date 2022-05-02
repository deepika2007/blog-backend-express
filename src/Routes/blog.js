const express = require('express');
const router = express.Router()
const Blog = require('../Controllers/blog')

router.get('/blog', Blog.showAllBlog)