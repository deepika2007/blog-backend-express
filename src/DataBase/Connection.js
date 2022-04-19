const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/angular-blog', {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('stablish')
}).catch((e) => {
    console.log('no connection')
})