import User from "../models/user.js";
import History from "../models/history.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) =>{
    try{
        const {fullName, emailId, password} = req.body;
        if(!(fullName && emailId && password)) res.send("Field missing");
        
        req.body.password = await bcrypt.hash(password, 10);
        const result = await User.create(req.body)

       
        res.send({message:"register success", success:true, data:result})
        
    }
    catch(err){
        // res.send({message:"Something went wrong", success:false, err})
        res.send("Error: "+err)
    }
}

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const result = await User.findOne({ emailId: emailId });

    if (!result) {
      return res.send({ message: "User not found", success: false });
    }

    const allowed = await bcrypt.compare(password, result.password);

    if (!allowed) {
      return res.send({ message: "Invalid credential", success: false });
    }


    return res.send({ message: "Login success", success: true, data:result });
  } catch (err) {
    return res.send({ message: "Something went wrong", success: false, err });
  }
};


export const logout = async (req, res) => {
    try{
        res.cookie("token", null, {expires: new Date(Date.now())})
        res.send({message:"Logout sucess", success:false})
    }
    catch(err){
        res.send({message:"Something went wrong", success:false, err:err})
    }
}
