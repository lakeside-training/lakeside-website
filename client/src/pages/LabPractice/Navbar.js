import React from "react"
import { Link, useNavigate } from "react-router-dom"

// import third party
import { Menu, MenuHandler } from "@material-tailwind/react"
import { ArrowLeft } from "react-feather"

const LabNavbar = () => {
  const navigate = useNavigate()
  const users = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <>
      <div className="sticky top-0 z-40 flex flex-shrink-0 h-16 bg-white ">
        <div className="flex flex-1 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between flex-1 lg:justify-end">
            <div className="flex  mr-auto xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <Link to="/" className="flex rounded outline-none w-fit ">
                  <div className=" flex row gap-2 items-center">
                    <ArrowLeft />
                    <h4 className=" text-xl ml-auto font-medium">
                      Knowledge & Uncertainty
                    </h4>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6 sm:ml-5">
              {/* user Profile Name */}
              <div className="flex items-center sm:ml-5 mobileView flex-col">
                <h4>{users?.[0]?.userName}</h4>
                <p className="text-xs text-end ml-auto text-[#A676F7]">
                  {users?.[0]?.isShowProfile ? users?.[0]?.profileType : null}
                </p>
              </div>

              {/*  user dropdown menu */}
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 }
                }}
                placement="left-start"
              >
                <MenuHandler>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    <img
                      className="object-cover bg-gray-300 rounded-full w-9 h-9"
                      src={
                        users?.[0]?.profilePic === " "
                          ? "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-male.png"
                          : users?.[0]?.profilePic
                      }
                      alt=""
                    />
                  </button>
                </MenuHandler>
              </Menu>
            </div>
          </div>
        </div>
        {/* border bottom */}
      </div>

      <div className="border-b border w-[95%] mx-auto border-gray-200"></div>
    </>
  )
}

export default LabNavbar
