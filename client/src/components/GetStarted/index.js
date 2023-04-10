import React from "react";
import { Link } from "react-router-dom";

const GetStart = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-8 py-10 overflow-hidden lg:px-24 md:py-20 bg-gray-50 rounded-3xl">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Create any landing page with Rareblocks
            </h2>
          </div>

          <ul className="flex flex-col items-center justify-center mt-8 space-y-5 sm:mt-12 lg:mt-16 md:flex-row md:space-y-0 md:space-x-12">
            <li className="flex items-center text-gray-900">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {" "}
                150+ UI Blocks{" "}
              </span>
            </li>

            <li className="flex items-center text-gray-900">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {" "}
                Fully Responsive{" "}
              </span>
            </li>

            <li className="flex items-center text-gray-900">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {" "}
                Just Copy & Paste{" "}
              </span>
            </li>
          </ul>

          <div className="mt-8 text-center sm:mt-12">
            <div className="relative inline-flex group">
              <div
                className="absolute duration-1000 rotate-180 transitiona-all opacity-70 -inset-px rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>

              <Link to="/steps">
                <a
                  href="#"
                  title=""
                  className="relative inline-flex items-center justify-center py-3.5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent px-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
                  role="button"
                >
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStart;
