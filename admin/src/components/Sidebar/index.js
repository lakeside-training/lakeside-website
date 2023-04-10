import React, { useState } from "react";
import MenuIcon from "../../assets/icons/menu.svg";
// import CloseIcon from "../../assets/icons/close.svg";

// import third party
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  LogOut,
  User,
  Home,
  PlayCircle,
  CreditCard,
  File,
  XCircle,
} from "react-feather";

// ** import Logo
import Logo from "../../assets/logo/logo.svg";
import whiteLogo from "../../assets/logo/white-logo.svg";

// ** import redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";

const Sidebar = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [menuStatus, setMenuStatus] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigation = [
    {
      nav: [
        {
          name: "Dashboard",
          icon: Home,
          path: "/",
        },
        {
          name: "Courses",
          icon: PlayCircle,
          path: "/courses",
        },
        {
          name: "Labs",
          icon: PlayCircle,
          path: "/lab",
        },
        {
          name: "User Payments",
          icon: CreditCard,
          path: "/payments",
        },
        {
          name: "User Management",
          icon: User,
          path: "/users",
        },
        {
          name: "Resources",
          icon: File,
          path: "/resources",
        },
      ],
    },
  ];

  const handleActive = (path) => {
    if (location.pathname === path) {
      return "bg-primary text-secondary";
    } else {
      return "text-gray-600";
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {!menuStatus && (
        <div className="lg:hidden block absolute top-[9px] left-[10px]  z-40">
          <img
            onClick={() => setMenuStatus(!menuStatus)}
            src={MenuIcon}
            alt="Menu-Icon"
            className="w-9 h-7 cursor-pointer"
          />
        </div>
      )}


      {/* mobile menu */}

      {menuStatus && (
        <div className="!z-50 w-[100vw] ms:w-[50vw] md:w-[30vw] lg:hidden left-0 top-0 fixed bg-[black] h-[100vh]">
          <div className="lg:hidden block absolute top-[15px] right-[20px] z-40">
            <XCircle onClick={() => setMenuStatus(!menuStatus)} size={25} className="text-white cursor-pointer mt-2" />
          </div>
          <div className="flex items-center flex-shrink-0 px-4 mt-5">
            <img className="w-auto h-8" src={whiteLogo} alt="Lakeside" />
          </div>

          <div className="px-4 mt-6">
            <hr className="border-gray-200" />
          </div>
          <div>
            <div className="block">
              <div className="flex flex-col gap-2 justify-between flex-1 px-3 mt-3">
                <div className="space-y-4">
                  {navigation.map((item, index) => {
                    return (
                      <nav key={index} className="flex-1 space-y-2">
                        {item.nav.map((navItem, navIndex) => {
                          if (navItem.name === "hr") {
                            return (
                              <div className="pt-0">
                                <hr className="border-gray-200" />
                              </div>
                            );
                          } else {
                            return (
                              <Link
                                key={navIndex}
                                to={navItem.path}
                                onClick={() => setMenuStatus(!menuStatus)}
                                title=""
                                className={` active:scale-95 flex items-center px-4 py-2.5 text-sm hover:text-[#4F46E5] font-medium transition-all duration-200 rounded-lg text-white group ${handleActive(
                                  navItem.path
                                )}`}
                              >
                                <navItem.icon className="mr-4 h-6 w-6" />
                                {navItem.name}
                              </Link>
                            );
                          }
                        })}
                      </nav>
                    );
                  })}
                </div>

                {/*  user dropdown menu */}
                <div className="pb-4 relative w-full overflow-hidden">
                  <Menu
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    placement="left-start"
                    className="relative"
                  >
                    <MenuHandler>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg hover:!text-[#4F46E5]"
                      >
                        <img
                          className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                          alt=""
                        />
                        {user
                          ? user.firstName + " " + user.lastName
                          : "Jacob Jones"}
                        <svg
                          className="w-5 h-5 ml-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </button>
                    </MenuHandler>

                    <MenuList className="z-40  p-3 h-auto !left-[50px] w-[80%] ms:w-[38%] md:w-[21%] mt-[50px] absolute !rounded border-0">
                      <Link onClick={() => setMenuStatus(!menuStatus)} to="/">
                        <MenuItem className="hover:bg-slate-200 duration-200  hover:text-[#4F46E5] hover:text-violet-500 py-2 flex gap-2 items-center">
                          <User size={20} />
                          <p className="text-ms">My Account</p>
                        </MenuItem>
                      </Link>
                      <Link onClick={() => {
                        setMenuStatus(!menuStatus)
                        handleLogout()
                      }} to="/login">
                        <MenuItem className="hover:bg-slate-200 hover:text-[#4F46E5] duration-200 py-2 flex gap-2 items-center">
                          <LogOut size={20} />
                          <p className="text-sm">Log Out</p>
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hidden w-[310px] md:flex-col lg:block h-[100vh] bg-white">
        <div className="md:w-64 md:flex-col fixed lg:block h-[100vh] left-0 top-0">
          <div className="flex flex-col justify-between h-full flex-grow pt-5 overflow-y-auto bg-white">
            <div>
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="w-auto h-8" src={Logo} alt="Lakeside" />
              </div>

              <div className="px-4 mt-6">
                <hr className="border-gray-200" />
              </div>

              <div className="flex flex-col gap-2 justify-between flex-1 px-3 mt-6">
                <div className="space-y-4">
                  {navigation.map((item, index) => {
                    return (
                      <nav key={index} className="flex-1 space-y-2">
                        {item.nav.map((navItem, navIndex) => {
                          if (navItem.name === "hr") {
                            return (
                              <div className="pt-0">
                                <hr className="border-gray-200" />
                              </div>
                            );
                          } else {
                            return (
                              <Link
                                key={navIndex}
                                to={navItem.path}
                                title=""
                                className={` active:scale-95 flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${handleActive(
                                  navItem.path
                                )}`}
                              >
                                <navItem.icon className="mr-4 h-6 w-6" />
                                {navItem.name}
                              </Link>
                            );
                          }
                        })}
                      </nav>
                    );
                  })}
                </div>
              </div>
            </div>

            {/*  user dropdown menu */}
            <div className="pb-4 px-3">
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                placement="left-start"
              >
                <MenuHandler>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
                  >
                    <img
                      className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                      src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                      alt=""
                    />
                    {user
                      ? user.firstName + " " + user.lastName
                      : "Jacob Jones"}
                    <svg
                      className="w-5 h-5 ml-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </button>
                </MenuHandler>

                <MenuList className="z-40 -mt-[60px] -ml-[180px] p-3 h-auto min-w-[170px]">
                  <Link to="/">
                    <MenuItem className="hover:bg-slate-200 duration-200 hover:text-violet-500 py-2 flex gap-2 items-center">
                      <User size={20} />
                      <p className="text-lg">My Account</p>
                    </MenuItem>
                  </Link>
                  <Link to="/login" onClick={handleLogout}>
                    <MenuItem className="hover:bg-slate-200 hover:text-red-500 duration-200 py-2 flex gap-2 items-center">
                      <LogOut size={20} />
                      <p className="text-lg">Log Out</p>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
