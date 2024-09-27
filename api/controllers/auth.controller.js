import { errorHandler } from "../Utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


/// Sign Up Controller
export const signup = async (req, res, next) =>{

    console.log(req.body)
    const {username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email,  password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("User created successfully")

    } catch (error) {
        next((error))   // Passes the error to the error-handling middleware

    }
 };

 /// Sign In Controller
export const signin = async (req, res, next) => {

const {email, password} = req.body;
try {
    
const validUser = await User.findOne({email})
if (!validUser) return errorHandler(404, "User Not Found")
const validPassword =  bcryptjs.compareSync(password, validUser.password)
if (!validPassword) return errorHandler(401, "Wrong Credentials")
const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
const {password : pass, ...rest} = validUser._doc;
res.cookie('access_token', token, {httpOnly : true}).status(200).json(rest)
} catch (error) {
    next(error)
}

}
 