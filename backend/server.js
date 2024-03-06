import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";


const app = express();

const PORT = process.env.PORT || 5000 ;

dotenv.config();
app.use(express.json()); //to parse the incoming requsts with json payloads (from req.body)
app.use("/api/auth",authRoutes)

// app.get("/",(req,res)=>{
//    //root route http://localhost/
//     res.send("Hello world!")
// })



app.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});
