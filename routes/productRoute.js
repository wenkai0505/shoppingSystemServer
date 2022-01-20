const router = require("express").Router()
const Product = require('../models/productModel')
const multiparty = require('multiparty');



// 取得商品
router.get('/', (req, res) => {
    Product.find({}, (err, product) => {
        if (err) {
            console.log(err)
        }
        if (!product) {
            res.status(400).send({
                success: false,
                msg: 'Product Item Not Found.'
            })
        }
        else {
            res.status(200).send({
                success: true,
                product: product
            })
        }
    })
})

// 新增商品
// router.post('/', (req, res) => {
//     let { title, price, productText } = req.body

//     const newProduct = new Product({
//         title, price, productText, pic
//     })

//     newProduct.save()
//         .then(() => {
//             res.status(200).send({
//                 success: true,
//                 msg: 'New Product Has Been Save.'
//             })
//         })
//         .catch((err) => {
//             res.status(400).send({
//                 success: false,
//                 error: err.message
//             })
//         })
// })

// //新增商品
router.post('/', (req, res) => {

    let form = new multiparty.Form({
        uploadDir: 'upload'
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
        }

        let title = fields.title[0]
        let productText = fields.productText[0]
        let price = fields.price[0]
        let pic = files.pic[0].path

        const newProduct = new Product({
            title, price, productText, pic
        })

        newProduct.save()
            .then(() => {
                res.status(200)
            })
            .catch((err) => {
                console.log(err)
            })
    })

})

// 取得單一商品
router.get('/:_id', (req, res) => {
    let { _id } = req.params
    Product.findOne({ _id }, (err, productOne) => {
        if (err) {
            console.log(err)
        }
        if (!productOne) {
            res.status(400).send({
                success: false,
                msg: 'Product not found.'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: productOne
            })
        }
    })

})

// 修改商品
router.patch('/:_id', (req, res) => {
    let { _id } = req.params
    console.log(_id)

    Product.findOne({ _id }, (err, product) => {
        if (err) {
            console.log(err)
        }
        if (!product) {
            res.status(400).send({
                success: false,
                mag: 'Product Not Found.'
            })
        }
        else {
            Product.findOneAndUpdate({ _id }, req.body, { new: true, runValidators: true })
                .then(() => {
                    res.status(200).send({
                        success: true,
                        msg: 'Product Is Update'
                    })
                })
                .catch((err) => {
                    res.status(400).send({
                        success: false,
                        error: err
                    })
                })

        }

    })

})

// 刪除商品
router.delete('/:_id', (req, res) => {
    let { _id } = req.params

    Product.findOne({ _id }, (err, product) => {
        if (err) {
            console.log(err)
        }
        if (!product) {
            res.status(400).send({
                success: false,
                mag: 'Product Not Found.'
            })
        }
        else {
            Product.findOneAndDelete({ _id })
                .then(() => {
                    res.status(200).send({
                        success: true,
                        msg: 'Product Is Delete'
                    })
                })
                .catch((err) => {
                    res.status(400).send({
                        success: false,
                        error: err
                    })
                })
        }
    })
})





module.exports = router