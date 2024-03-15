import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image-avatar'>
            <div className='w-10 rounded-full'>
                <img alt='Tailwind css chat bubble'
                src='https://www.freepik.com/free-psd/3d-illustration-human-avatar-profile_58509057.htm#query=avatar&position=0&from_view=keyword&track=sph&uuid=60c71e5f-5dc8-455f-91de-59ca51834392https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1710526073~exp=1710526673~hmac=16b51d331faa2748df6120a29b474b8d97c48c944299ca714d00be36ca83e428'/>
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500`}>
            Hi! what's up ?
        </div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
            12:00
        </div>
    </div>
  )
}

export default Message