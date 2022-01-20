const router = require("express").Router()
const User = require('../models/userModel')


// 註冊
router.post('/register', (req, res) => {
    let { username, email, password, phone } = req.body


    User.findOne({ email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user) {
            res.status(400).send({
                success: false,
                msg: 'This Email Has Been Registed. '
            })
        }
        else {
            const newUser = new User({
                username, email, password, phone
            })

            newUser.save()
                .then(() => {
                    res.status(200).send({
                        success: true,
                        msg: 'User Is Save Done.'
                    })
                })
                .catch((err) => {
                    res.status(400).send({
                        succesS: false,
                        error: err.message
                    })
                })

        }

    })

})

// 註冊
router.post('/login', (req, res) => {

    let { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (!user) {
            res.status(400).send({
                success: false,
                msg: 'User Or Password Is Not Match.'
            })
        }
        else {
            if (password === user.password) {
                res.status(200).send({
                    srccess: true,
                    user: user
                })
            }
            else {
                res.status(400).send({
                    success: false,
                    mag: 'User Or Password Is Not Match.'
                })
            }
        }
    })

})


module.exports = router