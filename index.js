const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoute = require('./routes/userRoute')
const ProductRouter = require('./routes/productRoute')
const cors = require('cors')

const multiparty = require('multiparty');

let port = process.env.PORT || 8080


mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log('Connect To MongoDB Atlas Successfully.')
    })
    .catch((err) => {
        console.log('MongoDB Connect Fall.')
        console.log(err)
    })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/upload', express.static('upload'))
app.use(cors())
app.use('/api/user', userRoute)
app.use('/api/product', ProductRouter)


app.get('/', (req, res) => {
    res.send('Wellcom To Shopping System API Server.')
})



app.listen(port, () => {
    console.log(`Server Is Running On Port ${port}`)
})