import React from 'react'
import { Link } from 'react-router-dom'

const Lab = () => {
  return (
    <div>
        <Link
                to="/dashboard"
                className=" mt-5 mx-2
                active:scale-95 hover:scale-[1.02] w-fit transition-all duration-200 flex items-center px-4 py-3 text-sm font-medium rounded-lg group bg-gray-100 text-black
              "
              >
                <div className="transition-all duration-200 transform group-hover:-translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-4 mr-1 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
                Back to My Lab
              </Link>
    </div>
  )
}

export default Lab