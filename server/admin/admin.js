//creating default admin account
const user = require("../modelss/user");
const bcrypt = require("bcrypt");


async function createAdminAccount() {
    try{
       const existingAdmin = await user.findOne({email: "admin@test.com"});
       if(!existingAdmin){
          const newAdmin = new user({
            name:"Admin",
            email:"admin@test.com",
            phone:9876543210,
            password: await bcrypt.hash("admin", 10),
            role:"admin"
          })
          await newAdmin.save();
          console.log("Admin Creaated Successfully")
       }else{
        console.log("Admin Already Exists")
       }
    }catch(error){
        console.error(error.message);
    }
}

module.exports = createAdminAccount;