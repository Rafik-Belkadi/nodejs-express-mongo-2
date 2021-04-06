const { getAllUsers, register, login } = require("../Controllers/userController")
var multer = require('multer')
var path = require('path');
var appDir = path.dirname(require.main.filename);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appDir+'/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const init = (router) => {
    router.route('/users').get(getAllUsers)
        .post(upload.single('photo'), register)
    router.route("/users/login").post(login)
}


module.exports.init = init