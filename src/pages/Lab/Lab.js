import React, { useState } from "react";

// ** import svg icons
import RightArrow from "../../assets/icons/right-arrow.svg";

// ** import pages
import LabsPage from "../LabsPage";

// ** import third party
import { Link } from "react-router-dom";

const Lab = () => {
  //   const [toggle, setToggle] = useState(true);

  //   const handleToggle = (val) => {
  //     setToggle(!toggle);
  //     setType(val);
  //   };

  return (
    <div className="min-h-[100vh] bg-[#F4F4F5] box-border relative">
      <div className="flex justify-end mb-2  z-10">
        {/* <div className="flex w-auto absolute top-[-10px] lg:top-[auto] left-[60px] lg:left-[auto] lg:sticky">
          <h2
            className={` ${toggle ? " text-gray-900" : "text-gray-300"
              } cursor-pointer lg:text-4xl font-bold flex font-pj duration-300 mr-2`}
            onClick={() => {
              handleToggle("Course");
            }}
          >
            Courses
          </h2>
          <h1 className="lg:text-3xl text-gray-900">|</h1>
          <h2
            className={` ${!toggle ? " text-gray-900" : "text-gray-300"
              } cursor-pointer lg:text-4xl font-bold flex font-pj duration-300 ml-2`}
            onClick={() => {
              handleToggle("Lab");
            }}
          >
            Lab Bypass
          </h2>
        </div> */}

        <Link className=" lg:mt-0 mt-[-10px]" to="/add-new-lab?name=Lab">
          <button className="active:scale-95 hover:scale-[1.02] transition-all duration-200 lg:flex w-auto px-3 py-3 text-sm font-medium rounded-lg group bg-primary text-secondary mr-3 ">
            <div className="transition-all duration-200 transform group-hover:translate-x-1 flex">
              <span className="hidden sm:block lg:block ">Add New</span>
              <img
                src={RightArrow}
                alt="right-arrow"
                className="hidden sm:block w-4 h-5 mx-1"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white block sm:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </button>
        </Link>
      </div>
      <div className=" mt-[40px] lg:mt-0">
        <LabsPage  />
      </div>
    </div>
  );
};

export default Lab;
