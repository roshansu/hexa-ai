import { useState, useEffect } from "react"

const ProjectList = ({title, click, setClick, openInput, setOpenInput}) => {
    const [openProjectHistory, setOpenProjectHistory] = useState(false)
        

    const arr = ["Data science", "Cyber security", "Ai/ML"];

    const ProjectHistory = ({title, click, setClick}) => {
        return(
            <button onClick={()=>setClick(title)} className={` bg-slate-800 w-full cursor-pointer text-sm justify-center hover:bg-slate-600 transition duration-200  rounded-xl items-center py-1`}>
                {title}
            </button>
        )
    }

  return (
    <div className='flex w-full flex-col pb-4 border-b border-gray-700 '>
      <button  className='flex cursor-pointer items-center w-full justify-between text-base'>
        <p onClick={()=>setOpenProjectHistory(openProjectHistory?false:true)}>{title}</p>
        <i className="fa-solid text-sm fa-plus"></i>
      </button>
      <div className='flex px-2 mt-1   w-full flex-col gap-2  '>
        {
            openProjectHistory?
                arr.map((val, ind)=>(
                    <ProjectHistory
                    click={click} setClick={setClick}
                    title={val} key={ind}/>
                ))
            :''
        }
      </div>
    </div>
  )
}

export default ProjectList
