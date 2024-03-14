import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();

const PORT = process.env.PORT || 5000 ;

dotenv.config();
app.use(express.json()); //to parse the incoming requsts with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

// app.get("/",(req,res)=>{ 
//    //root route http://localhost/
//     res.send("Hello world!")
// })



app.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});
