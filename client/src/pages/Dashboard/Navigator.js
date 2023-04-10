/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { useDispatch } from "react-redux"
import { setPage } from "../../redux/slices/layout"

const Navigator = ({ pageComponent, currentPage }) => {
  const dispatch = useDispatch()

  const handleChange = (page) => () => {
    dispatch(setPage(page))
  }

  const passwordChange = localStorage.getItem("changePass")

  return (
    <div>
      <main>
        <div className="py-6">
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          </div>
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <div className="w-full overflow-x-auto overflow-y-hidden scrollbar border-b border-gray-200">
              <div className="">
                <nav className="flex -mb-px space-x-10 w-full">
                  <a
                    href="#"
                    className={`
                    ${
                      currentPage === "courses"
                        ? " text-indigo-600 border-indigo-600"
                        : "border-transparent hover:border-gray-300 text-gray-500 "
                    }
                    py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("courses")}
                  >
                    My Courses
                  </a>

                  <a
                    href="#"
                    className={`
                    ${
                      currentPage === "labs"
                        ? " text-indigo-600 border-indigo-600"
                        : "border-transparent hover:border-gray-300 text-gray-500 "
                    }
                    py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("labs")}
                  >
                    My Labs
                  </a>

                  <a
                    href="#"
                    className={`
                    ${
                      currentPage === "profile"
                        ? " text-indigo-600 border-indigo-600"
                        : "border-transparent hover:border-gray-300 text-gray-500"
                    } py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("profile")}
                  >
                    Profile
                  </a>

                  {passwordChange !== "false" && (
                    <>
                      <a
                        href="#"
                        className={`
                    ${
                      currentPage === "password"
                        ? " text-indigo-600 border-indigo-600"
                        : "border-transparent hover:border-gray-300 text-gray-500 "
                    }
                    py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                        onClick={handleChange("password")}
                      >
                        Password
                      </a>
                    </>
                  )}

                  <a
                    href="#"
                    className={`
                    ${
                      currentPage === "notification"
                        ? " text-indigo-600 border-indigo-600"
                        : "border-transparent hover:border-gray-300 text-gray-500 "
                    }
                    py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("notification")}
                  >
                    Notification
                  </a>

                  

                  <a
                    href="#"
                    className={`
                     ${
                       currentPage === "refer"
                         ? " text-indigo-600 border-indigo-600"
                         : "border-transparent hover:border-gray-300 text-gray-500 "
                     }
                     py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("refer")}
                  >
                    Refer a Friend
                  </a>

                  <a
                    href="#"
                    className={`
                     ${
                       currentPage === "course"
                         ? " text-indigo-600 border-indigo-600"
                         : "border-transparent hover:border-gray-300 text-gray-500 "
                     }
                     py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("course")}
                  >
                   Courses
                  </a>

                  <a
                    href="#"
                    className={`
                     ${
                       currentPage === "lab"
                         ? " text-indigo-600 border-indigo-600"
                         : "border-transparent hover:border-gray-300 text-gray-500 "
                     }
                     py-4 text-sm font-medium transition-all duration-200 border-b-2  whitespace-nowrap`}
                    onClick={handleChange("lab")}
                  >
                     Labs
                  </a>
                </nav>
              </div>
            </div>
            {pageComponent}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Navigator
