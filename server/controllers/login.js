const mongoose = require('mongoose');
//const { model } = require('../models/login');
//const User = require('../models/login');
const User = require('../models/userSchema')
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();


const checkJWT = (req, res, next) => {
    let token = (req.params.token)
    let decoded = jwt.verify(token, process.env.SECRATE, function (err, token) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token' })
        }
        else {
            //res.status(200).send(decoded)
            console.log(decoded)
            return next()
        }
    })
}


//get user
const login = async (req, res) => {
    try {
        console.log(req.body, "!!!!!!!!!!")
        const user = await User.findOne({
            "gmail": req.body.gmail,
            "password": req.body.password
        })
        if (!user)
            res.status(200).send('user not exist')
        else {
            const token = jwt.sign(user.id+ user.password , process.env.SECRET)
            console.log(token);
            res.status(200).json({ myUser: user, toke: token })
        }
    } catch (error) {
        res.status(400).send('error')
    }
}

//create
const register = async (req, res) => {
    let currentUser = new User(req.body)
    console.log(currentUser)
    currentUser.save(function (err, user) {
        if (err)
            res.status(400).send(err);
        else {
            console.log("else!!!")
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'reut7819@gmail.com',
                    pass: process.env.MAIL_PASSWORD
                }
            });
            var mailOptions = {
                from: 'reut7819@gmail.com',
                to: currentUser.gmail,
                subject: 'register',
                text: 'wolcom to todo list reader'
            }

            const mail = transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).json({ user: user })

        }
    })
}

modul.export = { login, register, checkJWT }