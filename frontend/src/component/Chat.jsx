import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import Think from "./Think";

const Chat = ({ logo, role, text}) => {



  return (
    <div>
      {role === "user" && (
        <div className="text-white p-2 bg-slate-800 flex justify-start gap-4">
          <i className="fa-solid text-2xl fa-circle-user"></i>
          <div>{text}</div>
        </div>
      )}

      {role === "model" && (
        <div className="mt-4 p-2 text-slate-200 flex justify-start gap-3">
          <img className="size-8" src={logo} alt="" />
          <div>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
