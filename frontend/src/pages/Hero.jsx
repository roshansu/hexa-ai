import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false)
  useEffect(()=>{
    const res = localStorage.getItem('login')
    setLogin(res)
  }, [])

  return (
    <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] w-full bg-no-repeat bg-cover bg-center text-sm pb-44">
      {/* Navbar */}
      <nav className="flex text-xl lg:text-4xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent items-center justify-center p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
        {/* Logo */}
        Hexa.Ai
      </nav>

      {/* Announcement */}
      <div className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
        <button className="flex items-center gap-1 font-medium">
          <Link to={`${login?'/chat':'/login'}`}>Start conversation</Link>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54"
              stroke="#050040"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Hero Text */}
      <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8">
        Get your answers from multiple ai
      </h5>

      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
        Ask one question, receive insights from multiple AI models instantly — compare perspectives, 
        explore ideas, and find the solution that fits you best.
      </p>

      {/* Buttons */}
      <div className={` ${login?'hidden':'flex'} mx-auto w-full  items-center justify-center gap-3 mt-4`}>
        <Link to={'/register'} className="bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition">
          Sign up
        </Link>
        <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-200/30 rounded-full px-6 py-3">
          <Link to={'/login'}>Login</Link>
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25.5 4.75 4l-3.5 3.5"
              stroke="#050040"
              strokeOpacity=".4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
