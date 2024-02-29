import React, { useState } from "react";
import { Link } from "react-router-dom";
import c1 from "../images/backg.svg";
import c2 from "../images/ellipse.svg";
// import { Switch } from '@headlessui/react'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function isValidEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function handleClick() {
    if (!isValidEmail(email)) {
      console.log("Please enter a valid email address.");
    } else {
      navigate("/login1", { state: { email } });
    }
  }

  const [vis, setVis] = useState("password");
  const handleToggle = () => {
    if (vis === "password") setVis("text");
    else setVis("password");
  };
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex flex-col h-full justify-center items-center md:gap-[50px] md:flex-row lg:gap-[100px]">
      <div className="w-[30vw] my-auto">
        <img src={c1} alt="not found" className="my-auto" />
      </div>
      <div className="my-auto w-1/4">
        <div className="flex w-[160px] justify-between rounded-full border border-1 border-[#59E296] py-2 px-3">
          <div>
            <img src={c2} alt="not found" />
          </div>
          <div className="my-auto text-md font-medium">Securewatch</div>
        </div>
        <div className="font-bold text-lg">Create Account</div>
        <form>
          <label htmlFor="userid" className="text-base">
            Use your email or signup with google
          </label>
          <br />
          <input
            type="email"
            className="w-full rounded-md py-3 px-4 outline-none font-sans bg-[#f2f2f2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </form>
        <button
          className="mx-auto bg-[#28AA61] px-4 py-2 text-white"
          onClick={handleClick}
        >
          Sign in
        </button>
        <br />
        <button className="mx-auto bg-[#000000] px-4 py-2 text-white">
          Sign in with google
        </button>
        <div className="text-center">
          <span>Already have an account?</span>
          <Link to="/login" className="text-[#28AA61]">
            &nbsp; Sign in now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
