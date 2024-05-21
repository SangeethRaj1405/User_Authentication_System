const express = require("express");
const signupRoute = require("./routes/signup");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login")
const activateRoute = require("./routes/activate")
const resetRoute = require("./routes/reset")
const forgetpassRoute = require("./routes/foregetpass")
const cors = require("cors");//importing cors
const adminAccount = require("./admin/admin")
const emailCheck = require("./routes/emailCheck")


const userRouter = require("./routes/user")
const app=express();  //creating Express App
const PORT = process.env.PORT || 5000 

app.use(bodyParser.json());
app.use(cors());

adminAccount();
app.use("/user", signupRoute); //calling the SignupRoute
app.use("/auth", loginRoute); //calling the loginRoute
app.use("/Api",userRouter);
app.use("/activate",activateRoute);
app.use("/forget-password",forgetpassRoute);
app.use("/reset-password",resetRoute); 
app.use("/user", emailCheck); 
app.listen(PORT,()=>{
       console.log(`server is running on :http://localhost:${PORT}`);
});

