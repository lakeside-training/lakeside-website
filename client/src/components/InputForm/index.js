import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InputForm = ({ title, placeholder, func, status }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    func && func();
  };

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email.length > 0) {
      localStorage.setItem("EMAILS", email);
    }
  }, [email]);

  return (
    <div className="relative group">
      <div className="absolute z-0 transition-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-70 group-hover:duration-300"></div>
      <form
        className="mt-8 sm:mt-10 rounded-lg overflow-hidden "
        onSubmit={handleSubmit}
      >
        <div className="relative  p-[3.78px]  bg-white sm:border sm:border-gray-400 group sm:rounded-[14px] duration-200">
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder || ""}
            className="block w-full px-4 py-3 sm:py-4 text-gray-900 placeholder-gray-400 placeholder:text-xl bg-transparent border-none  outline-none focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 border-transparent"
          />
          <Link to="/steps">
            <div className="z-0 mt-4 sm:mt-0 sm:absolute hidden sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-[4.78px]">
              <button
                type="submit"
                className="inline-flex  active:scale-95 justify-center text-center rounded-[9.45px]  w-full sm:w-fit hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 focus:outline-none focus:bg-gray-600 font-pj "
              >
                {title || "Get Started"}
              </button>
            </div>
          </Link>
        </div>
      </form>
      <Link className={`${status === "home" && "hidden sm:block"}`} to="/steps">
        <div className="mt-4 z-10 sm:mt-0  sm:inset-y-0 sm:right-0 flex sm:hidden sm:items-center sm:pr-2">
          <button
            type="submit"
            className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-fit hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900  rounded-[9.45px]  focus:outline-none focus:bg-gray-600 font-pj "
          >
            {title || "Get Started"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default InputForm;
