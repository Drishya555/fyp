import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import { checkExistingUser, registerUser, getid } from '../db/queries.js';




export const registerController = async(req,res) =>{
    try {
        const {name, address,email, password} = req.body;

        //validate the data
        if(!name) return res.status(400).send({message: "Name is required"});
        if(!address) return res.status(400).send({message: "Address is required"});
        if(!email) return res.status(400).send({message: "Email is required"});
        if(!password) return res.status(400).send({message: "Password is required"});

        //Check if the user exists
        const existingUser = await checkExistingUser(email);
        if (existingUser) {
            return res.status(409).send({
              success: false,
              message: "Email is already taken",
            });
          }

        const hashedPassword = await hashPassword(password);
        const resetToken = crypto.randomBytes(32).toString("hex");
        console.log(`RESETTOKEN is ${resetToken}`)
        const user = await registerUser(name, address, email, hashedPassword, resetToken); 
        


        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user, // Return the user
          });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error while registering user", // Typo fixed
            err,
        })
    }
}


export const loginController = async(req,res) =>{
  try {
    const{email, password} = req.body;
    if(!email || !password){
      return res.status(404).send({
        success: false,
        message: "Invalid email or password"
    })
    }

    const user = await checkExistingUser(email);
    if(!user){
      return res.status(404).send({
          success: false,
          message: "Email is not registered",
      })
    }

    const match = await comparePassword(password, user.password);

    if(!match){
      return res.status(200).send({
          success: error,
          message: "invalid password"
      })
    }

    const userid = getid(email)


    const token = await JWT.sign({_id:userid}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user:{
          id: user.userid,
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,

      },
      token,
  })

  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "error in login",
      err,
  })
  }
}
