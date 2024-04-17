import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
 
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try {
        const {message}= req.body;
        console.log(message)
        const {id: recieverId} = req.params;
        const senderId = req.user._id;
        
        let conversation = await  Conversation.findOne({
            participants:{$all: [senderId, recieverId]}
        }) 

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        })
        await newMessage.save();
        if(newMessage){
            conversation.messages.push(newMessage._id);
 
        }
        await conversation.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.status(200).json({ message: "Message sent successfully" , newMessage});   
    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all: [senderId,userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        console.log(userToChatId,messages)
        res.status(200).json(messages)

    }
    catch(error){
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}