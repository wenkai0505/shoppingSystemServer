const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    productText: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: (new Date()).getDate()
    },
    month: {
        type: String,
        default: (new Date()).getMonth() + 1
    }

})


const Product = mongoose.model('Product', productSchema)
module.exports = Product