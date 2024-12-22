import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next )=>{
    //get the request body to the userName,email,password variables
    const{userName, email, password } = req.body;
    if(!userName || !email || !password || userName==='' || email==='' || password===''){
        next(errorHandler(400, 'All fields are required'));
    }
    //hash the user password
    const hashedPassword = bcryptjs.hashSync(password, 10)
    //create new user using request body items
    const newUser = new User({
        userName,
        email,
        password : hashedPassword,
    });
    try{
        //save new user inside the database 
        await newUser.save();
        res.json('signup sucessfull')
    } catch(error){
        next(error);
    }
    
}