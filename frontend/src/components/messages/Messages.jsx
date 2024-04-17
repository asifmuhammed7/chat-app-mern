
import { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessagesSkeleton'
import Message from './Message'
import useConversation from '../../store/useConversation'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const {loading} = useGetMessages()
  const {messages} = useConversation()
  useListenMessages();
  // console.log(messages)
  const lastMessageRef = useRef();  
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message,index)=>(
    // Check if message is truthy and has necessary properties
    message && typeof message === 'object' && message._id ? (
        <div key={`${message._id}_${index}`}
            ref={index === messages.length -1 ? lastMessageRef : null }
        >
            <Message message={message}/>
        </div>
    ) : null
))}

        {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx}/>)}
        {!loading && messages.length === 0 &&(
          <p className='text-center'>Send a message to start the conversation</p>
        )}
    
    </div>
  )
}

export default Messages



//starter code 


// import Message from './Message'

// const Messages = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//     </div>
//   )
// }

// export default Messages