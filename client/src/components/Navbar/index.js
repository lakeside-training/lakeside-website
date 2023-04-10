import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react"
import { X, LogOut, User, Menu as IconMenu } from "react-feather"
import "../../index.css"

// ** import logo
import { ReactComponent as Logo } from "../../assets/logo/logo.svg"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/auth"

const NavbarComponent = () => {
    const user = JSON.parse(localStorage.getItem("userInfo")) // ** get user info from local storage TODO: need to fix
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handelClick = () => {
        navigate("/")
    }

    // ** get current location
    const location = useLocation()
    const crrPath = "/" + location.pathname.split("/")[1]

    // ** state
    const [openNav, setOpenNav] = useState(false)

    // ** navbar shrink function
    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false))
    }, [])

    const isActive = (path) => (path === crrPath ? "text-violet-500" : "text-gray-900")

    // mobile navbar

    const NavSmall = (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
            className="justify-center items-center fixed left-0 top-0 z-30 min-w-[100vw] min-h-[100vh] duration-200 lg:hidden w-full md:w-auto md:order-1 flex "
        >
            <div className="position-relative w-full">
                <ul className="flex flex-col p-4 mt-4 w-[90%] mx-auto md:mt-0 md:text-sm md:font-medium ">
                    <Link
                        to="/"
                        className={`${isActive(
                            "/"
                        )} text-2xl hover:!text-[#4F46E5] font-medium !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Home
                    </Link>

                    <Link
                        to="/courses"
                        className={`${isActive(
                            "/courses"
                        )} text-2xl hover:!text-[#4F46E5] font-medium !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Courses
                    </Link>

                    <Link
                        to="/labPage"
                        className={`${isActive(
                            "/courses"
                        )} text-2xl hover:!text-[#4F46E5] font-medium !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Labs
                    </Link>

                    <Link
                        to="/corporate"
                        className={`${isActive(
                            "/corporate"
                        )} text-2xl hover:!text-[#4F46E5] font-medium !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Corporate
                    </Link>

                    <Link
                        to="/about-us"
                        className={`${isActive(
                            "/about-us"
                        )} text-2xl hover:!text-[#4F46E5] font-medium !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50  `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        About Us
                    </Link>

                    <Link
                        to="/contact-us"
                        className={`${isActive(
                            "/contact-us"
                        )} text-2xl hover:!text-[#4F46E5] font-medium  !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Contact Us
                    </Link>

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className={`${isActive(
                                    "/login"
                                )} text-2xl hover:!text-[#4F46E5] font-medium !block !sm:hidden  !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/steps"
                                className={`${isActive(
                                    "/login"
                                )} text-2xl hover:!text-[#4F46E5] font-medium !block !sm:hidden  !text-white py-1 transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )

    return (
        <nav className="bg-white px-2 py-2.5 ">
            <div className="flex justify-between !mx-auto items-center sm:px-14 w-[95.6%] 2xl:w-[87%] xl:w-[95%] 3xl:w-[60%] max-w-7xl  ">
                {/* nav logo */}
                <div className="flex items-center flex-shrink-0 ">
                    {user?.[0] ? (
                        <>
                            {window.location.href === "http://localhost:3000" ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="flex rounded outline-none"
                                    >
                                        <Logo />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="flex rounded outline-none"
                                    >
                                        <Logo />
                                    </Link>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                className="flex rounded outline-none"
                            >
                                <Logo />
                            </Link>
                        </>
                    )}

                    <div className={`hidden ml-8 justify-between items-center w-full lg:flex md:w-auto md:order-1`}>
                        <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium ">
                            <Link
                                to="/"
                                className={`${isActive(
                                    "/"
                                )} text-base font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                            >
                                Home
                            </Link>

                            <Link
                                to="/courses"
                                className={`${isActive(
                                    "/courses"
                                )} text-base font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                            >
                                Courses
                            </Link>
                            <Link
                                to="/labPage"
                                className={`${isActive(
                                    "/labPage"
                                )} text-base font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                            >
                                Labs
                            </Link>

                            <Link
                                to="/corporate"
                                className={`${isActive(
                                    "/corporate"
                                )} text-base font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                            >
                                Corporate
                            </Link>

                            <Link
                                to="/about-us"
                                className={`${isActive(
                                    "/about-us"
                                )} text-base font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50  `}
                            >
                                About Us
                            </Link>

                            <Link
                                to="/contact-us"
                                className={`${isActive(
                                    "/contact-us"
                                )} text-base font-medium  transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                            >
                                Contact Us
                            </Link>
                        </ul>
                    </div>
                </div>

                {/* nav login buttons  */}

                <div className="flex md:order-2 items-center  lg:w-[54%] xl:w-[50%] lg:justify-end">
                    {!user ? (
                        <>
                            <div className="lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                <Link
                                    to="/login"
                                    className={`${isActive(
                                        "/login"
                                    )} text-base hidden sm:inline mr-5 lg:mr-0 font-medium transition-all duration-200 rounded outline-none font-pj hover:text-opacity-50 `}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/steps"
                                    className={`${isActive(
                                        "/signup"
                                    )} active:scale-95 hidden sm:inline hover:scale-[1.02] duration-200 text-xs w-full px-3 xs:px-6 py-3  xs:text-sm font-semibold text-slate-50 bg-black rounded-xl`}
                                    role="button"
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    ) : (
                        // ** if user is logged in **
                        <>
                            {/* user Profile Name */}
                            <div className="flex items-center space-x-6 sm:ml-5">
                                <div className="flex items-center justify-end sm:ml-5 flex-col ">
                                    <h4 className="mobileView first-letter:capitalize ">{user?.[0]?.userName}</h4>
                                    <p className="text-xs text-end ml-auto text-[#A676F7]">
                                        {/* {user?.[0].isShowProfile ? user?.[0]?.profileType : null} */}
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
                                                    user?.[0]?.profilePic === " "
                                                        ? "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/4/avatar-male.png"
                                                        : user?.[0]?.profilePic
                                                }
                                                alt=""
                                            />
                                        </button>
                                    </MenuHandler>
                                    <MenuList className="z-40 mt-11 ml-[20px] p-3 h-auto">
                                        <Link to="/dashboard">
                                            <MenuItem className="hover:bg-slate-200 duration-200 hover:text-violet-500 py-2 flex gap-2 items-center">
                                                <User size={20} />
                                                <p className="text-lg">My Account</p>
                                            </MenuItem>
                                        </Link>
                                        <MenuItem
                                            onClick={() => {
                                                dispatch(logout())
                                                handelClick()
                                            }}
                                            className="hover:bg-slate-200 hover:text-red-500 duration-200 py-2 flex gap-2 items-center"
                                        >
                                            <LogOut size={20} />
                                            <p className="text-lg">Log Out</p>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        </>
                    )}

                    <button
                        data-collapse-toggle="navbar-cta"
                        type="button"
                        className={`-mr-2 ${
                            openNav ? "text-white fixed right-[20px]" : "text-black !ring-0"
                        } z-50 inline-flex items-center p-2 text-sm rounded-lg lg:hidden hover:bg-gray-100 outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 `}
                        aria-controls="navbar-cta"
                        aria-expanded="false"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? <X size={24} /> : <IconMenu size={24} />}
                    </button>
                </div>
            </div>
            {/* mobile view nav */}
            <div className={`origin-top  ${openNav ? " inline scale-y-1" : " scale-y-0 hidden"}  duration-300 `}>
                {NavSmall}
            </div>
        </nav>
    )
}

export default NavbarComponent
