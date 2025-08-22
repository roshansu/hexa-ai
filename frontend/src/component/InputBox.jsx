import React from 'react'

const InputBox = ({setCommand, command, sendMessage}) => {
  return (
    <div className='bg-gray-700 lg:w-[50%] lg:mx-0 mx-4 translate-x-[3%]  w-[90%] lg:translate-x-[50%] rounded-lg border border-slate-500 bottom-3 h-12  fixed lg:bottom-8 lg:h-24'>
      <input type="text" onChange={(e)=>setCommand(e.target.value)} value={command}
      className='w-full outline-none p-2 lg:p-4' placeholder='Ask anything....'
      />
      <button onClick={sendMessage}>
       <i className="fa-solid text-lg cursor-pointer absolute right-4 bottom-4 fa-paper-plane"></i>
      </button>
    </div>
  )
}

export default InputBox
