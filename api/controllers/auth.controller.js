import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

//sign in function

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,'All fields are required'));
    }

    try{
        const validUser = await User.findOne({ email })
        if(!validUser){
            return next(errorHandler(400,'User not fount'))
        }
        const validpassword = bcryptjs.compareSync(password, validUser.password);
        if(!validpassword){
            return next(errorHandler(400,'Password is not valid'))
        }
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validUser._doc;
        
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);

    } catch(error){
        next(error)
    }
}
