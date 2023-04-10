import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import third party
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { User, LogOut, Home, XCircle } from "react-feather";

// ** import logo
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/layout";
import { logout } from "../../redux/slices/auth";
import { notification, notificationCount } from '../../redux/slices/notification'
import axios from "../../axios";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userInfo"));
  const [notiStatus, setStatus] = useState(false)
  const [status, setPopup] = useState(false)

  const handelClick = () => {
    navigate("/");
  };

  const notifications = useSelector(state => state.notification.notification)
  const count = useSelector(state => state.notification.notificationCount)

  const bubble_sort = (allData) => {
    let data = allData
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].timestamp < data[j + 1].timestamp) {
          let swap = data[j]
          data[j] = data[j + 1]
          data[j + 1] = swap
        }
      }
    }

    return data;
  }

  useEffect(() => {
    if (notifications.length === 0) {
      const userData = JSON.parse(localStorage.getItem('userInfo'))

      if (userData !== null) {
        axios.post('/getNotifications', { id: userData[0].id })
          .then(async (data) => {
            if (data.data.success) {
              const datas = await bubble_sort(data.data.data);
              dispatch(notification(datas))
            }
          })
        axios.post('/getNotification_count', { id: userData[0].id })
          .then(data => {
            if (data.data.success) {
              dispatch(notificationCount(data.data.data[0].notification_count))
            }
          })
      }
    }
  }, [])

  document.body.addEventListener('click', () => {
    setStatus(false)
  })

  const openNoti = (e) => {
    e.stopPropagation()
    setStatus(!notiStatus)

    const userData = JSON.parse(localStorage.getItem('userInfo'))

    if (userData !== null) {
      axios.post('/setNotification_count', { id: userData[0].id, count: notifications.length })
        .then(data => {
          if (data.data.success) {
            dispatch(notificationCount(notifications.length))
          }
        })
    }
  }

  const openPopup1 = (e) => {
    e.stopPropagation()
    const noti = document.querySelectorAll('.notification')
    for (let i = 0; i < noti.length; i++) {
      noti[i].style.display = 'none'
      document.querySelectorAll('.rl')[i].style.background = 'none'
    }
    if (document.body.clientWidth < 768) {
      setPopup(true)
      e.target.nextElementSibling.style.display = 'none'
    } else {
      e.target.nextElementSibling.style.display = 'block'
    }
    const pos = e.target.getBoundingClientRect().top
    e.target.nextElementSibling.style.top = `${pos}px`
    e.target.parentElement.style.background = '#ddd'
  }

  const openPopup2 = (e) => {
    e.stopPropagation()
    const noti = document.querySelectorAll('.notification')
    for (let i = 0; i < noti.length; i++) {
      noti[i].style.display = 'none'
      document.querySelectorAll('.rl')[i].style.background = 'none'
    }

    const pos = e.target.getBoundingClientRect().top
    e.target.parentElement.nextElementSibling.style.top = `${pos}px`
    if (document.body.clientWidth < 768) {
      setPopup(true)
      e.target.parentElement.nextElementSibling.style.display = 'none'
    } else {
      e.target.parentElement.nextElementSibling.style.display = 'block'
    }
    e.target.parentElement.parentElement.style.background = '#ddd'
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex flex-shrink-0 h-16 bg-white ">
        <div className="flex flex-1 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between flex-1 lg:justify-end">
            <div className="flex  mr-auto xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                {/* need to fix */}
                <Link to="/" className="flex rounded outline-none w-fit ">
                  <Logo />
                </Link>
              </div>
            </div>

            {/* search input */}
            <div className="flex-1 hidden max-w-xs ml-auto lg:block">
              <label className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>

                <input
                  type="search"
                  name=""
                  id=""
                  className="border block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm "
                  placeholder="Search here"
                />
              </div>
            </div>

            {/* mail inbox */}
            <div className="flex items-center space-x-6 sm:ml-5">
              {/* <div className="relative">
                <button
                  type="button"
                  className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                  2
                </span>
              </div> */}

              {/* notification bell */}
              <div className="relative">
                <div className="cursor-pointer" onClick={openNoti}>
                  <button
                    className=" p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </button>
                  {
                    (notifications.length - count) !== 0 && (
                      <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                        {(notifications.length - count.toString())}
                      </span>
                    )
                  }
                </div>

                {
                  notiStatus && (
                    <div onClick={e => {
                      e.stopPropagation()
                      setStatus(true)
                    }} style={{ boxShadow: '0 4px 20px rgb(0 0 0 / 10%)' }} className="max-w-100vw z-10 overflow-y-auto p-[10px] left-[0] ms:left-[-600%] sm:left-[-300%] rounded-lg bg-[white] fixed ms:absolute top-0 ms:top-[120%] w-full ms:w-[300px] h-[100vh] ms:h-[350px]">
                      <XCircle onClick={(e) => {
                        e.stopPropagation()
                        setStatus(false)
                      }} className="ms:hidden block !z-[40] absolute right-2 top-2 hover:text-[#3462b6] transition duration-300" size={25} />
                      {
                        notifications.length > 0 ? notifications.map(data => {
                          const userData = JSON.parse(localStorage.getItem('userInfo'))
                          const date = new Date(data.createdAt)
                          return (
                            <>
                              <div className="rl relative mt-1 rounded-lg w-full cursor-pointer hover:!bg-[#ddd] !pl-[10px] !py-[10px] p-[5px]">
                                <div onClick={openPopup1} className="relative flex items-center">
                                  <div onClick={openPopup2} className="absolute w-full h-full"></div>
                                  <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    ></path>
                                  </svg>
                                  <div className="ml-2">
                                    <p className="font-semibold">{data.title}</p>
                                    <p className="text-[14px]">{<ReactTimeAgo date={date} locale="en-US" />}</p>
                                  </div>
                                </div>
                                <div style={{ boxShadow: '0 4px 20px rgb(0 0 0 / 10%)' }} className="py-[10px] px-[20px] z-20 notification hidden w-full md:w-[300px] absolute md:fixed right-0 top-0 md:right-[32%] md:top-[13%] rounded-lg bg-[white]">
                                  <div className="absolute right-2 top-2">
                                    <XCircle size={25} className="hover:text-[#3462b6] transition duration-300" />
                                    <div onClick={(e) => {
                                      e.target.parentElement.parentElement.style.display = 'none'
                                    }} className="w-full h-full absolute left-0 top-0"></div>
                                  </div>
                                  <p className="font-semibold">Hi <span className="ml-1">{userData !== null && userData[0].userName}</span>,</p>
                                  <p className="text-xl font-semibold">{data.title}</p>
                                  <p className="mt-3">{data.body}</p>
                                  <p className="mt-1">{data.text}.</p>
                                  <a className="text-[#3462b6] mt-1 hover:underline" target="_blank" href={data.link}>Customer Service</a>
                                  <p className="mt-2">Lakeside Team,</p>
                                  <p className="mt">Thanks</p>
                                </div>
                              </div>

                              {
                                status && (
                                  <div className="absolute top-0 left-0 w-full h-full bg-[white] p-[15px]">
                                    <XCircle onClick={() => setPopup(false)} className="!z-[50] absolute right-2 top-2 hover:text-[#3462b6] transition duration-300" size={25} />
                                    <p className="font-semibold">Hi <span className="ml-1">{userData !== null && userData[0].userName}</span>,</p>
                                    <p className="text-xl font-semibold">{data.title}</p>
                                    <p className="mt-3">{data.body}</p>
                                    <p className="mt-1">{data.text}.</p>
                                    <a className="text-[#3462b6] mt-1 hover:underline" target="_blank" href={data.link}>Customer Service</a>
                                    <p className="mt-2">Lakeside Team,</p>
                                    <p className="mt">Thanks</p>
                                  </div>
                                )
                              }
                            </>
                          )
                        }) :
                          <div className="flex w-full h-full justify-center items-center">
                            <p>Do not have any notification</p>
                          </div>
                      }
                    </div>
                  )
                }
              </div>


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
                  unmount: { y: 25 },
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
                <MenuList className="z-40 mt-11 ml-[20px] p-3 h-auto">
                  {window.location.href ===
                    "http://localhost:3000/dashboard" ? (
                    <>
                      <Link to="/">
                        <MenuItem className="hover:bg-slate-200 duration-200 hover:text-violet-500 py-2 flex gap-2 items-center">
                          <Home size={20} />
                          <p className="text-lg">Home</p>
                        </MenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => dispatch(setPage("courses"))}
                      >
                        <MenuItem className="hover:bg-slate-200 duration-200 hover:text-violet-500 py-2 flex gap-2 items-center">
                          <User size={20} />
                          <p className="text-lg">My Account</p>
                        </MenuItem>
                      </Link>
                    </>
                  )}

                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      handelClick();
                    }}
                    className="hover:bg-slate-200 hover:text-red-500 duration-200 py-2 flex gap-2 items-center"
                  >
                    <LogOut size={20} />
                    <p className="text-lg">Log Out</p>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        {/* border bottom */}
      </div>

      <div className="border-b border w-[95%] mx-auto border-gray-200"></div>
    </>
  );
};

export default Navbar;
