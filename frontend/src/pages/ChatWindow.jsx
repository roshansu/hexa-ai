import ProjectList from "../component/ProjectList"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import History from "../component/History"
import { Link } from "react-router-dom"
import '../scroll.css'
import Chat from "../component/Chat"
import InputBox from "../component/InputBox"
import openai from '../assets/openai.svg'
import gemini from '../assets/gemini.svg'
import deepseek from '../assets/deepseek.svg'
import Think from "../component/Think"


const ChatWindow = () => {
    const [loading, setLoading] = useState(false)
  
    const [hideOpenAi, setHideOpenAi] = useState(false);
    const [hideGemini, setHideGemini] = useState(false);
    const [hideDeepSeek, setHideDeepSeek] = useState(false);
    const [bar, setBar] = useState(false)
    const [active, setActive] = useState('')
    const [data, setData] = useState()
    const [command, setCommand] = useState('')
    const [conversations, setConversations] = useState([])
    const [login, setLogin] = useState(true)
    const id = localStorage.getItem('id')
    const navigate = useNavigate() 
    const [chatId, setChatId] = useState('')

    async function fetchHistory() {
        const res = await fetch(`http://localhost:5000/chat/history/${id}`,{
            credentials:"include"
        })
        const data = await res.json();
        console.log(data)
        setConversations(data)
    }

    useEffect(()=>{
        fetchHistory()
        const res = localStorage.getItem('login')
        setLogin(res)
    }, [])

    const openAiRef = useRef(null);
        const geminiRef = useRef(null);
        const deepSeekRef = useRef(null);

        useEffect(() => {
        if (openAiRef.current) {
            openAiRef.current.scrollTop = openAiRef.current.scrollHeight;
        }
        }, [data?.openAi, loading]);

        useEffect(() => {
        if (geminiRef.current) {
            geminiRef.current.scrollTop = geminiRef.current.scrollHeight;
        }
        }, [data?.gemini, loading]);

        useEffect(() => {
        if (deepSeekRef.current) {
            deepSeekRef.current.scrollTop = deepSeekRef.current.scrollHeight;
        }
        }, [data?.deepSeek, loading]);
    
    console.log(hideDeepSeek, hideGemini, hideGemini)

    const handleHistory = async (id) =>{
        console.log(id)
        setChatId(id)
        setLoading(true)
        setActive(id)
        setHideDeepSeek(false)
        setHideOpenAi(false)
        setHideGemini(false)
        const res = await fetch(`http://localhost:5000/chat/conversation/${id}`,{
            credentials:"include"
        })
        const result = await res.json();
        setLoading(false)
        if(result.deepSeek.length<2){
            setHideDeepSeek(true)
        }
        if(result.gemini.length<2){
            setHideGemini(true)
        }
        if(result.openAi.length<2){
            setHideOpenAi(true)
        }
        setData(result)
        
        console.log(result)
        
    }
   async function sendMessage() {
        if (!command) return alert("enter message");
        setLoading(true);
        setCommand('')

        const res = await fetch("http://localhost:5000/chat/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            command,
            deepseek: hideDeepSeek,
            gemini: hideGemini,
            openai: hideOpenAi,
            chatId,
            userId: id
            }),
        });

        const result = await res.json();
        setLoading(false);

        setData(prev => ({
            ...prev,
            openAi: [...(prev?.openAi || []), ...(result?.openAi || [])],
            gemini: [...(prev?.gemini || []), ...(result?.gemini || [])],
            deepSeek: [...(prev?.deepSeek || []), ...(result?.deepSeek || [])],
        }));
        }


    async function newChat() {
        setData({
            openAi: [],
            gemini: [],
            deepSeek: [],
        });
        setHideDeepSeek(false)
        setHideOpenAi(false)
        setHideGemini(false)

        setActive('')
        setChatId('')
    }

    if(!login){
        return navigate('/')
    }
            
  return (
    <div className='flex'>
        <button onClick={()=>setBar(true)} className={` ${bar?'hidden':'block'} lg:hidden fixed top-1 left-1 text-lg text-white`} >
            <i className="fa-solid fa-bars"></i>
        </button>
      <div className={` ${bar?'flex':'hidden'} h-screen element overflow-auto lg:flex flex-col items-center gap-4 p-3 w-[250px] border-r border-gray-700`}>
        <div className="flex w-full gap-2">
            <Link to={'/'} className=' text-xl lg:text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent'>
            Hexa.Ai
            </Link>
          <button onClick={()=>setBar(false)} className={` ${bar?'block':'hidden'} text-white text-lg `}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className='w-full pb-4 border-b border-gray-700 '>
            <button onClick={newChat} className='bg-white mt-4  text-black cursor-pointer hover:bg-gray-200 transition duration-200 font-medium text-base w-full rounded-lg py-2'>New chat</button>
        </div>
        {/* <div className='w-full flex flex-col gap-4'>
            <button  type="button" className='flex items-center cursor-pointer  font-medium w-full justify-between'>
                <p onClick={handleProject} >Project</p>
                <i onClick={()=>setOpenInput(true)} className="fa-solid fa-plus cursor-pointer"></i>
            </button>
            <div className="flex flex-col w-full gap-4 ">
                {
                    openProject?arr.map((val, ind)=>(
                        <ProjectList click={click} setClick={setClick}
                         title={val} key={ind} openInput={openInput} setOpenInput={setOpenInput} />
                    )):''
                }
            </div>
        </div> */}

        <div className="flex w-full flex-col gap-4">
            {
                conversations?.chatHistory?.length>0?
                conversations?.chatHistory.map((val, ind)=>(
                    <History handleHistory={handleHistory} title={val.title}
                     key={val._id} id={val._id} active={active} />
                )):'no history'
            }   
        </div>
      </div>

        {/* <div className={` ${openInput?'flex':'hidden'} fixed flex top-0 left-0 h-screen w-screen justify-center items-center bg-black/50 `}>
            <form className=" w-[300px] h-fit  px-3 py-2 shadow-lg bg-gray-700 rounded-lg" action="">
                <div className="text-lg flex font-medium w-full justify-between items-center">
                    <p >Create a new project</p>
                    <i onClick={()=>setOpenInput(false)} className="fa-solid cursor-pointer fa-xmark"></i>
                </div>
                <p>Enter project name</p>
                <input onChange={(e)=>{
                    if(e.target.value.length > 50) return;
                    setInputData({...inputData, title: e.target.value})
                }} value={inputData.title} className="py-2 w-full mt-1  px-2 mb-2 rounded-lg bg-black outline-none border-2 border-white" type="text" required={true} />
                    <p>System prompt</p>
                <textarea rows={4} className="py-1 w-full mt-1 px-2  rounded-lg bg-black outline-none border-2 border-white" 
                type="text" required={true} placeholder="Enter system instruction under 500 words"
                value={inputData.instruction} onChange={(e)=>{
                        if(e.target.value.length > 500) return;
                        setInputData({...inputData, instruction: e.target.value})

                }} />

                <button type="submit" className="w-full py-1 mt-3 hover:bg-gray-300 transition duration-200 cursor-pointer bg-white rounded-lg text-black font-medium flex justify-center items-center">Create</button>

            </form>

        </div> */}

      <div className="w-full lg:ml-0 ml-4 flex element overflow-x-auto">
            <div className={` ${hideOpenAi?'w-fit':'flex flex-col min-w-[300px] lg:flex-1'} h-screen  border-r border-r-slate-600 `}>
                <div className="flex justify-between border-b border-slate-700 p-4 items-center">
                    <div className={` ${hideOpenAi?'flex-col ':'flex'}  items-center gap-3`}>
                        <img className="size-6" src={openai} alt="" />
                        <div className={`${hideOpenAi?'block':'hidden'}`}>
                        <i onClick={()=>setHideOpenAi(false)} className={`  fa-solid mt-4 text-lg fa-up-right-and-down-left-from-center`}></i>
                        </div>
                        <p className={` ${hideOpenAi?'hidden':'block'}`}>ChatGpt</p>
                    </div>
                    <div className={` ${hideOpenAi?'hidden':'block'} flex items-center gap-4 text-xl justify-center`}>
                        <i onClick={()=>{
                            setHideDeepSeek(true)
                            setHideGemini(true)
                        }} class="fa-solid fa-comment"></i>
                        <i onClick={()=>setHideOpenAi(true)} className="fa-solid text-2xl fa-toggle-on"></i>
                        {/* <i className="fa-solid  fa-toggle-off"></i> */}
                    </div>
                </div>

                <div
                 ref={openAiRef}
                className={` ${hideOpenAi?'hidden':'block'} mt-4 pb-40  element overflow-auto`}>
                        {
                
                            data?.openAi.length>1?
                            data.openAi.map((val, ind)=>(
                                <Chat logo={openai} role={val.role}
                                 text={val.text} key={ind} loading={loading} />
                            ))
                            :''
                        }{
                            loading?<Think/>:''
                        }
                </div>
            </div>

            <div className={` ${hideGemini?'w-fit':'flex min-w-[300px] flex-col flex-1'} h-screen   border-r border-r-slate-600 `}>
                <div className="flex justify-between border-b border-slate-700 p-4 items-center">
                    <div className={` ${hideGemini?'flex-col ':'flex'}  items-center gap-3`}>
                        <img className="size-6" src={gemini} alt="" />
                        <div className={`${hideGemini?'block':'hidden'}`}>
                        <i onClick={()=>setHideGemini(false)} className={`  fa-solid mt-4 text-lg fa-up-right-and-down-left-from-center`}></i>
                        </div>
                        <p className={` ${hideGemini?'hidden':'block'}`}>Gemini</p>
                    </div>
                    <div className={` ${hideGemini?'hidden':'block'} flex items-center gap-4 text-xl justify-center`}>
                        <i onClick={()=>{
                            setHideDeepSeek(true)
                            setHideOpenAi(true)
                        }} class="fa-solid fa-comment"></i>
                        <i onClick={()=>setHideGemini(true)} className="fa-solid text-2xl fa-toggle-on"></i>
                        {/* <i className="fa-solid  fa-toggle-off"></i> */}
                    </div>
                </div>

                <div
                    ref={geminiRef}
                className={` ${hideGemini?'hidden':'block'} mt-4 pb-40  element overflow-auto`}>
                        {
                            
                            data?.gemini.length>1?
                            data.gemini.map((val, ind)=>(
                                <Chat logo={gemini} role={val.role}
                                 text={val.text} key={ind} loading={loading} />
                            ))
                            :''
                        }{
                            loading?<Think/>:''
                        }
                </div>
            </div>

            <div className={` ${hideDeepSeek?'w-fit':'flex min-w-[300px] flex-col flex-1'} h-screen   border-r border-r-slate-600 `}>
                <div className="flex justify-between border-b border-slate-700 p-4 items-center">
                    <div className={` ${hideDeepSeek?'flex-col ':'flex'}  items-center gap-3`}>
                        <img className="size-6" src={deepseek} alt="" />
                        <div className={`${hideDeepSeek?'block':'hidden'}`}>
                        <i onClick={()=>setHideDeepSeek(false)} className={`  fa-solid mt-4 text-lg fa-up-right-and-down-left-from-center`}></i>
                        </div>
                        <p className={` ${hideDeepSeek?'hidden':'block'}`}>DeepSeek</p>
                    </div>
                    <div className={` ${hideDeepSeek?'hidden':'block'} flex items-center gap-4 text-xl justify-center`}>
                        <i onClick={()=>{
                            setHideOpenAi(true)
                            setHideGemini(true)
                        }} class="fa-solid fa-comment"></i>
                        <i onClick={()=>setHideDeepSeek(true)} className="fa-solid text-2xl fa-toggle-on"></i>
                        {/* <i className="fa-solid  fa-toggle-off"></i> */}
                    </div>
                </div>
                <div
                ref={deepSeekRef}
                className={` ${hideDeepSeek?"hidden":'block'} mt-4 element pb-40 overflow-auto`}>
                   {
                       
                        data?.deepSeek.length>1?
                        data.deepSeek.map((val, ind)=>(
                            <Chat logo={deepseek} role={val.role}
                            text={val.text} key={ind} loading={loading} />
                        ))
                        :''
                    }{
                            loading?<Think/>:''
                        }
                </div>
            </div>
        </div>
        <InputBox command={command} setCommand={setCommand} sendMessage={sendMessage}
        />
    </div>
  )
}

export default ChatWindow
