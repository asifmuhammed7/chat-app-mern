import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId =req.user._id;
        const conversations = await Conversation.find({participants:loggedInUserId}) 
        const participantIds = conversations.flatMap(conv => conv.participants);
        const uniqueParticipantIds = [...new Set(participantIds)];
        const otherUserIds = uniqueParticipantIds.filter(id => id.toString() !== loggedInUserId.toString());

        const otherUsers = await User.find({ _id: { $in: otherUserIds } }).select("-password");
        console.log("other",otherUsers);
         res.status(200).json(otherUsers)
    } catch (error) {
        console.log("Error in getUserSlidebar",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getSearchUser = async (req,res)=>{
      try {
        
        const resUser = await User.find();
        
        res.status(200).json(resUser)
      } catch (error) {
        console.log("error in getSearchUser", error.message)
      }
}

// first part finished
