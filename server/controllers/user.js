const user = require("../services/user");

async function getUser(request, response){
    try{
       const users = await user.getUser();
       response.json(users);
    }catch(error){
        response.status(500).json({message: error})
    }
}

module.exports = { getUser}