const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");
const { request } = require("express");

function authenticateToken(request,response,next) {
  const authHeader = request.header("authorization")
  if(!authHeader){
    return response.status(401).json({message: "Unauthorised: Missing token"});
  }
  const [bearer, token] = authHeader.split(" ");
  if(bearer !== "Bearer" || !token){
    return response.status(401).json({message: "Unauthorized: Invalid Token Format"});
  }

  jwt.verify(token, secretKey, (err, user)=>{
    if(err){
        return response.status(403).json({message: "Forbidden: Invalid Token"})
    }
    request.user = user;
    next();
  })
}

module.exports = {authenticateToken}