const authService = require("../services/login");

async function login(request,response){
    try{
        const {email, password} = request.body;
        const token = await authService.login(email,password);
        response.json({token: token})
    }catch{
        response.status(401).json({message:"Invalid Credentials"})
    }
}

module.exports = { login }