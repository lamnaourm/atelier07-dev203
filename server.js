import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import user from './routes/user.js'

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 3000
const url = process.env.URL_MONGOOSE

mongoose.connect(url)
    .then(()=>{
        console.log('Connected to Mongo')
    })
    .catch((err) =>{
        console.log('Unable to connect to Mongo')
    })

app.use('/', user)

app.listen(port, (err) => {
    if(!err)
        console.log('Server started at ' + port)
    else
        console.log('Unable to start server')
})


