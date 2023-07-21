const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo=()=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("connect to mongo")
    })
}

module.exports = connectToMongo;