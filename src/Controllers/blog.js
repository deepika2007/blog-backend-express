const Blog = require('../Models/blog')
// file uploader 
const createBlog = async (req, res, next) => {
    if (req && req.file) {
        try {
            const one = new Blog({
                thumbnail: req.file.path,
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
            })
            const createBlog = await one.save()
            res.status(201).json({
                status: true, result: createBlog
            })
        } catch (e) {
            res.status(400).json({ status: false, result: e.message })
        }
    }
    // }
}

// all blog data

const showAllBlog = async (req, res) => {
    try {
        const data = await Blog.find();
        res.status(200).send(data)
    } catch (e) { res.status(400).send(e) }
}

// blog data by id 

const showOneBlog = async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Blog.findById(_id);
        if (!data) { res.status(404).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e }) }
}

// update blog
const updateBlog = async (req, res) => {
    try {
        const one ={
            thumbnail: req.file.path,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
        }
        console.log(req.body,one)
        const _id = req.params.id
        const data = await Blog.findByIdAndUpdate(_id, one, {
            new: true
        });
        if (!_id) { res.status(400).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e.message }) }
}

// delete blog 
const deleteBlog = async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Blog.findByIdAndDelete(_id);
        if (!_id) { res.status(400).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e.message }) }
}
module.exports = { createBlog, showAllBlog, showOneBlog, updateBlog, deleteBlog }