// Importer la librairie http
const express = require('express')
const bp = require('body-parser')
const app = express()
const db = require('./config/db')
const router = express.Router()
const userRouter = require('./routes/userRoute')
var checkToken = require('./config/jwt')

app.use(bp.json())
router.use(checkToken)
userRouter.init(router)

app.use(router)
// Crypté les password 
// 1- file upload sur la table user
// 2- ajouter l'authentification par JWT
// 3- créer des routes sécurisé 

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


