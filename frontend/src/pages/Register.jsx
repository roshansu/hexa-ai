import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SuccessAlert from "../component/SuccessAlert";
import ErrorAlert from "../component/ErrorAlert";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hide, setHide] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!fullName || !emailId || !password || !confirmPassword) {
      return alert("All fields are required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setHide("success");

    try {
      const res = await fetch("https://hexa-ai-six.vercel.app/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, emailId, password }),
      });

      const datas = await res.json();

      if (datas.success) {
        localStorage.setItem("id", datas.data._id);
        localStorage.setItem("login", true);
        navigate("/chat");
      } else {
        setHide("error");
      }
    } catch (err) {
      console.error(err);
      setHide("error");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-400">
      {hide === "success" ? (
        <SuccessAlert close={setHide} text={"Creating your account..."} />
      ) : (
        ""
      )}
      {hide === "error" ? (
        <ErrorAlert close={setHide} text={"Registration failed! Try again."} />
      ) : (
        ""
      )}

      <form
        onSubmit={handleRegister}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
        <p className="text-gray-500 text-sm mt-2">Create a new account</p>

        {/* Full Name */}
        <div className="flex items-center w-full mt-8 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <button
          type="submit"
          className={`${
            hide === "" ? "block" : "hidden"
          } mt-5 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity`}
        >
          Sign Up
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account?{" "}
          <Link className="text-indigo-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
