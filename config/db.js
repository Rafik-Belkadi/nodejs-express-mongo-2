const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true, useUnifiedTopology: true  }).then(() => console.log("nice")).catch(() => console.log("flemme"))

module.exports = mongoose.connection