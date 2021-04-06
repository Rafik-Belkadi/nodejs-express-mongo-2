const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secret = "wowpureejesuistropsecrurise"

const getAllUsers = (req, res) => {
    userModel.find().then((data) => {
        res.status = 200
        res.json(data)
    }).catch((err) => {
        res.status = 201
        res.json(err)
    })
}

const register = (req, res) => {
    userModel.findOne({ email: req.body.email }).then((data) => {
        console.log(req.file)
        if (data) {
            res.status = 200
            res.json({ message: "Utilisateur existe déja bouffojn" })
        } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    var user = new userModel({
                        email: req.body.email,
                        password: hash,
                        photo: req.file.path
                    })
                    user.save().then((userReturned) => {
                        res.json({ message: "User created Successfully", user: userReturned })
                    }).catch(err => res.json(err))
                });
            });

        }
    }).catch((err) => {
        res.status = 201
        res.json(err)
    })
}

const login = (req, res) => {
    userModel.findOne({ email: req.body.email }).then((data) => {
        console.log(req.body)
        if(!data) {
            res.status = 201
            res.json({message : "No user with this email"})
        }
        else{
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if(result){
                    var token = jwt.sign(req.body.email, secret)  
                    res.json({
                        user : result,
                        token: token
                    })
                }
                else{
                    res.status = 201
                    res.json({ message: "incorrect password or email invalid" })
                }
            });
        }
    }).catch((err) => {
        res.status = 201
        res.json(err)
    })
}


module.exports = { getAllUsers, register, login }