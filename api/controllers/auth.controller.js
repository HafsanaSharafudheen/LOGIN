import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    console.log({ username, email, password });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
    
        res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body,'.................')
    try {
        const validUser = await User.findOne({email});
        console.log(validUser,"valideeeeeeeeeeeeeeeeeee")
        if (!validUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Wrong credentials" });
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        
        const expiryDate = new Date(Date.now() + 3600000);
        
        const cookieOptions = {
            httpOnly: false,
            secure: true,
                sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
    
        };
<<<<<<< HEAD
        console.log(token,"...................token")  
        res.cookie('access_token', token, cookieOptions);
        validUser.password ="";
        res.status(200).json({ message: "Authentication successful", user: validUser });
        
=======
      console.log(token,"...................token")  
        res.cookie('access_token', token, cookieOptions);
        
        res.status(200).json({ message: "Authentication successful", user: validUser });
>>>>>>> 527880ad4e985b4907fcc6e405e6dc2d7a577e10
    } catch (error) {
        next(error);
    }
};
