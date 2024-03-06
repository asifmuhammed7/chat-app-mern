import User from "../models/userModel";

export const signup = async (req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(password!== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }
        const user = await User.findOne({username}) 

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        //Hash password here
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:newUser.profilePic  
        })
    } catch (error ) {
        
    }
}

export const login = async (req,res)=>{
    try {
        res.send("login route")
    console.log("login")
    } catch (error) {
        console.log(error)
    }
}

export const logout  = (req,res)=>{
    res.send("logout route")
}