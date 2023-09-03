require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// express app
const app = express()
const problemRoutes = require('./routes/problem')

app.use(express.json())
app.use(cors())

//middleware , next is must to move to another middleware
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next()
})

//routes
app.use('/problems' , problemRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
       .then( () => {
        console.log("Connected successfully!")
       })
       .catch((error) => {
        console.log(error)
       })

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port' , process.env.PORT)
})