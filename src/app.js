const express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
require('./DataBase/Connection') //server calling 

const app = express();
const upload = require('./middleware/upload');
const { createBlog, showAllBlog, showOneBlog, updateBlog, deleteBlog } = require('./Controllers/blog');

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use('/uploads',express.static('uploads'));// here public is name of a folder of static file
app.use(cors(corsOptions)) // Use this after the variable declaration
app.set("view engine", "ejs");// Set EJS as templating engine 



app.post('/blog', upload.single('thumbnail'),createBlog)
app.get('/blog', showAllBlog)
app.get('/blog/:id', showOneBlog)
app.put('/blog/:id',updateBlog)
app.delete('/blog/:id', deleteBlog)


app.listen(port, () => {
    console.log(`connection setup at ${port}`)
})