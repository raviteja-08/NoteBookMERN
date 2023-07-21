const connectToMongo = require('./db')
const express = require("express")
const cors = require('cors')
const app = express();

connectToMongo();

app.listen(3221,()=>{
    console.log("port 3221")
 })

app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

