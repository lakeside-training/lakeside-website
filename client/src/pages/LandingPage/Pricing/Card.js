/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import BGColor from "./BGColor";
import axios from "../../../axios";

// import redux
import { useSelector } from "react-redux";

const Card = ({ plan, data }) => {

  const { auth } = useSelector((state) => state.auth) 

  const process = async (value, price) => {
    if(!auth){
      return window.location.href = "/login"
    }
    if (price === "99") {
      localStorage.setItem("plan", value);
      const { data } = await axios.post("/userPlan", {
        plan: value,
      });
      if (data) {
        localStorage.setItem("paymentId", data.id);
        return (window.location = data.url);
      }
    } else if (price === "999") {
      localStorage.setItem("plan", value);

      const { data } = await axios.post("/oneTimePayment", {
        name: value,
        amount: price,
      });
      if (data) {
        localStorage.setItem("paymentId", data.id);
        return (window.location = data.url);
      }
    }
  };

  return (
    <div className=" max-w-sm grid-cols-1 gap-6 mx-auto mt-8 text-center md:flex justify-center md:text-left md:mt-16 md:max-w-6xl ">
      {data.map((i, index) => (
        <div
          key={index}
          className="relative flex mt-5 md:mt-0 justify-center items-center w-[100%] xs:w-[325px]"
        >
          {i.name === "oneTime" && <BGColor />}

          <div
            className={`relative overflow-hidden ${
              i?.name === "oneTime" ? "bg-gray-900" : "bg-slate-50"
            } border border-gray-200 rounded-2xl text-white"`}
          >
            <div className="p-6 lg:px-10 lg:py-8">
              <h3
                className={`text-lg font-bold font-pj ${
                  i?.name === "oneTime" ? " text-white" : "text-gray-900"
                }`}
              >
                {i?.name}
              </h3>
              <p
                className={`mt-3 text-4xl font-bold font-pj  ${
                  i?.name === "oneTime" ? " text-white" : "text-gray-900"
                }`}
              >
                $ {i?.price}
              </p>
              <p className="mt-5 text-base font-normal leading-7 text-gray-400 font-pj">
                Best for medium business owners, startups who needs landing page
                for their business.
              </p>
              <a
                role="button"
                onClick={() => {
                  process(i.name, i.price);
                }}
                className={`
			  inline-flex items-center justify-center px-8 py-3.5 w-full mt-8 text-base font-bold ${
          i?.name === "oneTime"
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-white"
        } transition-all duration-200 border-2 border-transparent focus:ring-offset-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-opacity-90
			  
			  `}
              >
                Get Started
              </a>

              <p
                className={`mt-8 text-base font-bold ${
                  i?.name === "oneTime" ? " text-white" : "text-gray-900"
                } font-pj`}
              >
                {i.includes}
              </p>
              <ul className="mt-4 space-y-3 text-base font-medium text-gray-400 font-pj">
                {i?.course_include.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
