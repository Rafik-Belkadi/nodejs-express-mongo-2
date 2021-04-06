const jwt = require('jsonwebtoken');
const secret = "wowpureejesuistropsecrurise"
module.exports = function checkToken(req, res, next) {
    var token = req.headers['token'];
    if (token) {
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                res.json({
                    "status": 500,
                    "message": "INVALID TOKEN",
                    "error": err.message
                });
            } else {
                next();
            }
        })
    } else {
        res.json({
            "status": 500,  
            "message": "NO TOKEN PROVIDE",
            "error": "token must be provide in header for endpoint access"
        });
    }
}


