import React from 'react'
import { useState } from 'react'

const History = ({title, id, handleHistory, active}) => {
  return (
    <button onClick={()=>handleHistory(id)} className={` ${active === id?'bg-slate-600':'bg-slate-800'}  w-full cursor-pointer  justify-center hover:bg-slate-600 transition duration-200  rounded-xl items-center py-2`}>
        {title}
    </button>
  )
}

export default History
