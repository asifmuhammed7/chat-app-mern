import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
export const sendMessage = async (req,res)=>{
    try {
        const {message}= req.body;
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

        res.status(200).json({ message: "Message sent successfully" });   
    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}