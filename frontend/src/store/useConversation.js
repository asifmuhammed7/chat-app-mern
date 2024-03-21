import {create} from 'zustand';

const useConversation = create ((set)=>({
    selectedConversation: null,
    setSelectedConversation : (selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages: (messsages)=> set({messsages})

}))

export default useConversation;