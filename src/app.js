const express = require('express');
const path =require('path')
require('./DataBase/Connection')
const app = express();
const Blog = require('./Models/blog')
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const multer = require('multer')
// const formData = require('express-form-data');

// app.use(formData.parse());

// app use 

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.static('public'));// here public is name of a folder of static file
app.use(cors(corsOptions)) // Use this after the variable declaration


// Set EJS as templating engine 
app.set("view engine", "ejs");
// file uploader 
storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var docPath = `./uploads/` || './images/';
        cb(null, docPath)
    },
    filename: function(req, file, cb) {
        var type = file.mimetype.split('/');
        cb(null, Date.now() + '.' + type[type.length - 1]);
    }
})
upload = multer({
    storage: storage
}),

app.post('/blog', upload.single('thumbnail'), async (req, res,next) => {
    if (req && req.file) {
        var absolutePath = path.join(path.dirname(require.main.filename), req.file.path);
        req.file.absolutePath = absolutePath;
        try {
            const one = new Blog({
                thumbnail:absolutePath,
                blog:req.body
            })
            const createBlog = await one.save()
            console.log(createBlog)
            res.status(201).json({
                status: true, result: createBlog
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({ status: false, result: e.message })
        }
    }
    // }
})

// all blog data

app.get('/blog', async (req, res) => {
    try {
        const data = await Blog.find();
        res.status(200).send(data)
    } catch (e) { res.status(400).send(e) }
})

// blog data by id 

app.get('/blog/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Blog.findById(_id);
        if (!data) { res.status(404).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e }) }
})

// update blog
app.put('/blog/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Blog.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (!_id) { res.status(400).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e.message }) }
})

// delete blog 
app.delete('/blog/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Blog.findByIdAndDelete(_id);
        if (!_id) { res.status(400).send() }
        else { res.status(200).json({ status: true, result: data }) }
    } catch (e) { res.status(500).json({ status: false, result: e.message }) }
})


app.listen(port, () => {
    console.log(`connection setup at ${port}`)
})