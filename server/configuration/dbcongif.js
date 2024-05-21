const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user_authenticate_DB");

mongoose.connection.on("connected", ()=>{
    console.log("Connected to  Mongo Db");
})

mongoose.connection.on("error", (error)=>{
    console.log(`MongoDb connection error: ${error}`);
})

module.exports = mongoose;
