/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// ** import images
import StepsFinish from "../../assets/images/StepsFinish.png"

// ** import svg icons
import ArrowLeft from "../../assets/icons/normal/arrow-left.svg"

import code from "../../assets/icons/normal/code.svg"
import cloud from "../../assets/icons/normal/cloud.svg"
import docs from "../../assets/icons/normal/multi-files.svg"
import layers from "../../assets/icons/normal/layers.svg"
import chartD from "../../assets/icons/normal/chart-d.svg"

import book from "../../assets/icons/normal/book.svg"
import bag from "../../assets/icons/normal/bag.svg"
import apps from "../../assets/icons/normal/apps.svg"

import star from "../../assets/icons/normal/star.svg"
import trophy from "../../assets/icons/normal/trophy.svg"
import king from "../../assets/icons/normal/king.svg"
import { useDispatch, useSelector } from "react-redux"
import { setSteps } from "../../redux/slices/steps"
import { AnimatePresence, motion } from "framer-motion"
import axios from "../../axios"
import CourseCard from "../../components/CourseCard"
import { toast } from "react-hot-toast"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

const Steps = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getEmail = localStorage.getItem("EMAILS")
    const getStep = localStorage.getItem("step")
    const { steps } = useSelector((state) => state.steps)
    const [activeStep, setActiveStep] = useState(1)
    //step 7 states
    const [paymentMethod, setPaymentMethod] = useState("")
    const [email, setEmail] = useState("")
    const [checkStep, setStepStatus] = useState(false)
    const [stepHistory, setStepHisotory] = useState([])
    const [registerInfo, setregisterInfo] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    })
    const { amount } = useSelector((state) => state.amount)
    localStorage.setItem("courseStatus", false)

    useEffect(() => {
        if (amount?.length !== 0) {
            let getCourseId = amount.map((i) => i.id)
            localStorage.setItem("groupId", JSON.stringify(getCourseId))
        }
    }, [amount])
    localStorage.setItem("EMAILS", steps.email)
    if (activeStep === 7) {
        localStorage.setItem("EMAILS", email)
    }

    const subtotal = amount.reduce((sum, item) => sum + parseInt(item.price), 0)
    const tax = Math.round(subtotal * 0.1)
    const total = Math.round(subtotal + tax)

    localStorage.setItem("price", total)

    const handelChange = (e) => {
        const { name, value } = e.target
        setregisterInfo((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handelPayment = async () => {
        const { data } = await axios.post("/user/email", {
            email
        })
        if (data.data >= 1) {
            return toast.error("Email already exists")
        }

        if (amount.length === 0) {
            return toast.error("Please Select Any one Course")
        }

        if (paymentMethod.length === 0) {
            return toast.error("Please Select Payment Method")
        }
        if (paymentMethod === "Stripe") {
            const { data } = await axios.post("/firstPayment", {
                amount: total,
                name: "First payment"
            })
            if (data) {
                localStorage.setItem("paymentId", data.id)
                return (window.location = data.url)
            }
        } else {
            const { data } = await axios.post("/firstPaypal/payment", {
                name: "First payment",
                price: total
            })
            if (data) {
                localStorage.setItem("paymentId", data.id)
                return (window.location = data)
            }
        }
    }

    useEffect(() => {
        if (
            registerInfo.firstName.length !== 0 &&
            registerInfo.lastName.length !== 0 &&
            registerInfo.phone.length !== 0
        ) {
            localStorage.setItem("registerInfo", JSON.stringify(registerInfo))
        }
    }, [registerInfo])

    useEffect(() => {
        if ((getEmail?.length !== 0) & (getEmail !== null)) {
            setEmail(getEmail)
        }
    }, [])

    const [userSteps, setUserSteps] = useState({
        email: getEmail === null ? null : getEmail & (getEmail?.length === 0) ? email : getEmail,
        study: steps.study,
        role: steps.role,
        stage: steps.stage,
        archive: steps.archive
    })
    const [courses, setCourses] = useState([])
    const [allCourses, setallCourses] = useState([])

    useEffect(() => {
        if (courses?.length > 3) {
            const cour = courses.slice(0, 3)
            setCourses(cour)
        }
    }, [courses])

    // const firstSix = courses.slice(0, 6);

    useEffect(() => {
        if (userSteps.study !== null) {
            const Api = async () => {
                const { data } = await axios.post("/user-intrestCourse", {
                    areaOfIntrest: userSteps.study
                })
                return setCourses(data)
            }
            Api()
        }
    }, [userSteps.study])

    useEffect(() => {
        const API = async () => {
            const { data } = await axios.get("/course/all")
            const filter = data.data.filter((i) => i.course_track !== userSteps.study)
            setallCourses(filter)
        }

        API()
    }, [])

    useEffect(() => {
        dispatch(setSteps(userSteps))
    }, [userSteps])

    useEffect(() => {
        if ((getStep !== null) & (getStep?.length !== 0)) {
            setActiveStep(Number(getStep))
            localStorage.removeItem("step")
            return
        }
    }, [])

    const handleClick = (item, value) => {
        const option = {
            1: "email",
            2: "study",
            3: "role",
            4: "stage",
            5: "archive"
        }[item]
        setUserSteps({
            ...userSteps,
            [option]: value
        })
    }
    const handelEmail = (item, value) => {
        return setUserSteps({
            ...userSteps,
            [item]: value
        })
    }

    const handleNext = (num) => {
        if (num === 7) {
            setActiveStep(num)
            return
        }
        if (activeStep === 2 && checkStep === false) {
            toast.error("Please select a option")
            return
        }
        setActiveStep(num > 0 ? num : activeStep + 1)
        setStepHisotory([...stepHistory, activeStep])
    }

    console.log(stepHistory)

    const handleBack = () => {
        if (stepHistory.length !== 0) {
            let list = [...stepHistory]
            setActiveStep(stepHistory[stepHistory.length - 1])
            list.pop()
            setStepHisotory(list)
        } else {
            return navigate("/")
        }
    }

    const handleSubmit = () => {
        console.log(userSteps)
    }
    const rightToLeft = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.2,
                duration: 1
            }
        }
    }
    const Options = {
        2: {
            title: "Which area of study interests you the most?",
            subTitle: "Choose whatever you like, you can always change it later.",
            options: [
                { title: "AWS Certification", icon: code },
                { title: "Cloud Computing", icon: cloud },
                { title: "Project Management", icon: docs },
                { title: "Product Management", icon: layers },
                { title: "Information Technology", icon: chartD }
            ]
        },
        3: {
            title: "Tell us about yourself",
            subTitle: "It will help us make your experience better.",
            options: [
                { title: "Student", icon: book },
                { title: "Professional", icon: bag },
                // { title: "Parent of a student", icon: users },
                // { title: "Teacher", icon: boardT },
                { title: "Other", icon: apps }
            ]
        },
        4: {
            title: "How well do you know Cloud Computing ?",
            subTitle: "It will help us make your experience better.",
            options: [
                { title: "I'm a beginner", icon: star },
                { title: "I'm an intermediate", icon: trophy },
                { title: "I'm an expert", icon: king }
            ]
        },
        5: {
            title: "What do you want to archive with Lake Side Learn?",
            subTitle: "It will help us make your experience better.",
            options: [
                { title: "Learning professional skills" },
                { title: "Exercising my brain to stay sharp" },
                { title: "Exploring new topics I'm interested in" },
                {
                    title: "I want to provide the best learning tool to my child"
                },
                { title: "Something else, it’s a secret" }
            ]
        },
        6: {
            title: "Our courses based on your interest",
            subTitle: "Premium learning experience."
        },
        7: {
            title: "",
            subTitle: ""
        }
    }

    const checkRadio = (e) => {
        e.target.previousSibling.previousSibling.checked = true
        setPaymentMethod(e.target.previousSibling.innerHTML)
    }

    return (
        <div className="mx-auto">
            <div className="py-12 bg-white ">
                <div className="px-4 mx-auto sm:px-6 lg:px-8  w-full  relative">
                    <div className="py-5 px-7 flex justify-center items-center">
                        <nav className="flex flex-wrap items-center gap-2 sm:gap-5 md:gap-x-7 justify-center xs:justify-start">
                            <div>
                                <div
                                    className=" hidden md:flex absolute left-[5%] top-[-20px] lg:top-[30%]  cursor-pointer "
                                    onClick={handleBack}
                                >
                                    <img
                                        src={ArrowLeft}
                                        alt=""
                                    />
                                    <a className="font-semibold text-[#737373] cursor-pointer ">Go Back</a>
                                </div>
                                <button
                                    className="cursor-pointer  flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleBack}
                                >
                                    <img
                                        src={ArrowLeft}
                                        alt="arrow-left"
                                    />
                                </button>
                            </div>

                            <a className="ml-2 cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 1 ? "bg-indigo-600 text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    1
                                </span>
                            </a>
                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="ml-2 cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 2 ? "bg-indigo-600 text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    2
                                </span>
                            </a>

                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 3 ? "bg-indigo-600 text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    3
                                </span>
                            </a>

                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 4 ? "bg-indigo-600  text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    4
                                </span>
                            </a>

                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 5 ? "bg-indigo-600  text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    5
                                </span>
                            </a>

                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 6 ? "bg-indigo-600  text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    6
                                </span>
                            </a>
                            <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>

                            <a className="cursor-pointer inline-flex items-center text-base font-medium text-gray-900">
                                <span
                                    className={` ${
                                        activeStep === 7 ? "bg-indigo-600  text-white" : "bg-white"
                                    } inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-whiteborder border-2 border-gray-300 rounded-full`}
                                >
                                    7
                                </span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {activeStep === 1 && (
                <motion.section
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    key="step1"
                >
                    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="">
                            <div className="w-full lg:h-[300px] flex items-center justify-end flex-col">
                                <h3 className=" text-base text-center font-bold text-gray-900  sm:text-2xl">
                                    Enter your email ?
                                </h3>

                                <input
                                    onChange={(e) => handelEmail(e.target.name, e.target.value)}
                                    name="email"
                                    value={userSteps.email}
                                    placeholder="Enter your email"
                                    required
                                    className="z-10 outline-none cursor-pointer inline-flex lg:min-w-[70%] xl:min-w-[70%]  min-w-full items-center px-4 py-3 mt-10 my-6 text-base font-bold transition-all duration-200  hover:bg-gray-200 text-gray-900 bg-white border box-border border-gray-300 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            <AnimatePresence>
                <motion.div
                    key={activeStep}
                    // animate={rightToLeft}
                    // rightToLeft
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="overflow-hidden mx-auto"
                >
                    <div className="text-center px-4">
                        <h2 className="text-gray-900 sm:text-3xl sm:max-w-md max-w-lg md:max-w-lg mx-auto font-bold my-2">
                            {Options[activeStep]?.title}
                        </h2>
                        <p>{Options[activeStep]?.subTitle}</p>
                    </div>

                    {Options[activeStep]?.options?.length ? (
                        <div className="py-12 bg-white w-full flex justify-center ">
                            <div className="w-full ">
                                <div className="mx-auto w-[95%] xs:w-[70%] sm:w-[50%] lg:w-[35%] ">
                                    <nav className="flex flex-col space-y-2">
                                        {Options[activeStep].options?.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative max-w-auto inline-flex items-center "
                                                >
                                                    {(activeStep === 2 && item?.title === userSteps.study) ||
                                                    (activeStep === 3 && item?.title === userSteps.role) ||
                                                    (activeStep === 4 && item?.title === userSteps.stage) ||
                                                    (activeStep === 5 && item?.title === userSteps.archive) ? (
                                                        <div className="absolute -inset-2 ">
                                                            <div
                                                                className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
                                                                style={{
                                                                    background:
                                                                        " linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                                                                }}
                                                            ></div>
                                                        </div>
                                                    ) : null}

                                                    <a
                                                        key={index}
                                                        className={`${
                                                            (activeStep === 2 && item?.title === userSteps.study) ||
                                                            (activeStep === 3 && item?.title === userSteps.role) ||
                                                            (activeStep === 4 && item?.title === userSteps.stage) ||
                                                            (activeStep === 5 && item?.title === userSteps.archive)
                                                                ? " border-black border-2 bg-white"
                                                                : ""
                                                        } z-10 cursor-pointer inline-flex min-w-full items-center px-4 py-3 my-[.5] text-base font-bold transition-all duration-200  hover:bg-gray-100 text-gray-900 bg-white border box-border border-gray-200 rounded-xl`}
                                                        onClick={() => {
                                                            handleClick(activeStep, item.title)
                                                            if (activeStep === 2) {
                                                                setStepStatus(true)
                                                            }
                                                        }}
                                                    >
                                                        {item?.icon && (
                                                            <img
                                                                src={item?.icon}
                                                                alt="icon"
                                                                className="w-8 h-8 mx-3"
                                                            />
                                                        )}
                                                        {item?.title}
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </motion.div>
            </AnimatePresence>

            {activeStep === 6 && (
                <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="w-full">
                        <div className={`course-step w-[100%] flex items-center justify-center my-6`}>
                            <CourseCard data={courses} />
                        </div>
                    </div>
                </div>
            )}

            {/* {activeStep === 6 && (
        <motion.section
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          key="step6"
        >
          <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="w-full">
              
              <h4 className="text-center text-2xl font-semibold my-3">Other to</h4>
              <CourseCard data={allCourses} />
            </div>
          </div>
        </motion.section>
      )} */}

            {activeStep === 7 && (
                <motion.section
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    key="step7"
                >
                    <div className="mt-8 text-center sm:mt-12 w-full flex justify-center">
                        <div className="relative inline-flex group mb-14 w-full ms:w-[85%] sm:w-[75%] md:w-[60%] 2xl:w-[1300px]">
                            <div
                                className="ms:block hidden w-full absolute duration-1000 rotate-180 transition-all opacity-70 -inset-px rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                                }}
                            ></div>
                            <div className=" flex px-7 py-0 ms:py-12 flex-wrap bg-white w-full relative items-center justify-between text-base font-bold transition-all duration-200 border border-transparent font-pj rounded-xl">
                                <div className="w-full lg:w-[48%] flex justify-start flex-col">
                                    <h4 className="text-[19px] font-pj font-[600] text-start">Contact Information</h4>

                                    {/* Form inputs */}
                                    <form action="">
                                        <div className="flex justify-start flex-col mt-4">
                                            <label className="text-base text-start font-medium text-gray-900 font-pj">
                                                First Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    onChange={handelChange}
                                                    value={registerInfo.firstName}
                                                    name="firstName"
                                                    type="text"
                                                    id=""
                                                    required
                                                    placeholder="First Name"
                                                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-start flex-col mt-4">
                                            <label className="text-base text-start font-medium text-gray-900 font-pj">
                                                Last Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    onChange={handelChange}
                                                    value={registerInfo.lastName}
                                                    name="lastName"
                                                    type="text"
                                                    id=""
                                                    required
                                                    placeholder="Last Name"
                                                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-start flex-col mt-4">
                                            <label className="text-base text-start font-medium text-gray-900 font-pj">
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    type="email"
                                                    name=""
                                                    id=""
                                                    required
                                                    placeholder="Email"
                                                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-start flex-col mt-4">
                                            <label className="text-base text-start font-medium text-gray-900 font-pj">
                                                Phone Number
                                            </label>
                                            <div className="mt-1">
                                                {/* <input
                                                    type="tel"
                                                    onChange={handelChange}
                                                    value={registerInfo.phone}
                                                    name="phone"
                                                    required
                                                    maxLength={10} // Use maxLength instead of max
                                                    id="phone"
                                                    pattern="[0-9]*"
                                                    placeholder="Phone Number"
                                                    className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                                                /> */}
                                                <PhoneInput
                                                    country={"us"}
                                                    value={registerInfo.phone}
                                                    className=" customInputSize block w-full bg-white caret-gray-900 placeholder-gray-600  text-gray-900 border border-gray-400 rounded-xl focus-within:border-2 focus-within:border-gray-900 focus-within:ring-gray-900"
                                                    onChange={(phone, e2, e3) => {
                                                        setregisterInfo({
                                                            ...registerInfo,
                                                            phone: phone
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-[19px] font-pj font-[600] text-start mt-5 mb-4">
                                                Payment methods
                                            </h4>
                                            <div className="flex justify-between items-center">
                                                <div className="relative w-[48%] border-2 border-[#828282] flex justify-start items-center px-3 rounded-[5px] py-2 cursor-pointer">
                                                    <input
                                                        name="payment"
                                                        className="cursor-pointer"
                                                        type="radio"
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="block text-center w-[80%] cursor-pointer"
                                                    >
                                                        Stripe
                                                    </label>
                                                    <div
                                                        onClick={checkRadio}
                                                        className="absolute w-full h-full left-0 top-0"
                                                    ></div>
                                                </div>

                                                <div className="relative w-[48%] border-2 border-[#828282] flex justify-start items-center px-3 rounded-[5px] py-2 cursor-pointer">
                                                    <input
                                                        name="payment"
                                                        className="cursor-pointer"
                                                        type="radio"
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="block text-center w-[80%] cursor-pointer"
                                                    >
                                                        Paypal
                                                    </label>
                                                    <div
                                                        onClick={checkRadio}
                                                        className="absolute w-full h-full left-0 top-0"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full lg:w-[48%] border-2 border-[#A1A1AA] rounded-[20px] p-5 mt-10 lg:mt-0">
                                    <h4 className="text-[19px] font-pj font-[600] text-center">Payment</h4>
                                    <div>
                                        {amount.map((i) => (
                                            <div
                                                className="flex items-center justify-between mt-5"
                                                key={i.id}
                                            >
                                                <p className="text-[14px] text-[#767676] font-pj font-[400] !text-start">
                                                    {i.name}
                                                </p>
                                                <p className="text-[15px] text-[#131212] font-pj">${i.price}</p>
                                            </div>
                                        ))}

                                        <div className="my-4 border-t-[1px] border-[#E2E2E2]"></div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[14px] text-[#767676] font-pj font-[400] !text-start">
                                                Subtotal ({amount.length} Courses)
                                            </p>
                                            <p className="text-[15px] text-[#131212] font-pj my-3">${subtotal}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[14px] text-[#767676] font-pj font-[400] !text-start">
                                                Tax
                                            </p>
                                            <p className="text-[15px] text-[#131212] font-pj">${tax}</p>
                                        </div>
                                        <div className="my-4 border-t-[1px] border-[#E2E2E2]"></div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[15px] text-[#131212] font-pj font-[400] !text-start">
                                                Total
                                            </p>
                                            <p className="text-[15px] text-[#131212] font-pj">${total}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-4">
                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                className="overflow-hidden rounded-sm mt-1"
                                                checked
                                            />
                                            <label
                                                className="ml-2 font-[400] text-[15px] text-[#767676] !text-start"
                                                htmlFor=""
                                            >
                                                By clicking this button you agree to terms and condition
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-14 flex justify-between items-center">
                                        <button
                                            type="submit"
                                            className="inline-flex !w-[48%] active:scale-95 justify-center text-center rounded-[5px] sm:w-fit hover:scale-[1.02] py-2.5 text-lg font-bold text-[#344054] transition-all duration-200 bg-white border-2 border-[#828282] font-pj "
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handelPayment}
                                            type="submit"
                                            className="inline-flex !w-[48%] active:scale-95 justify-center text-center rounded-[5px] sm:w-fit hover:scale-[1.02] py-2.5 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent font-pj "
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            <div className="w-full flex justify-center">
                {activeStep === 7 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link>
                            <button
                                type="button"
                                className="hidden active:scale-95 hover:scale-[1.02]  items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                                onClick={handleSubmit}
                            >
                                Sign Up Now
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex flex-col"
                        style={{ marginBottom: "20px" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            type="button"
                            // disabled={!userSteps.email.length}
                            className="inline-flex active:scale-95 hover:scale-[1.02]  w-[250px] h-[52px] items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                            onClick={() => handleNext()}
                        >
                            Continue
                        </button>
                        <br />
                        {activeStep !== 1 && (
                            <div className={`${activeStep === 6 && "hidden"} relative flex justify-center mt-1`}>
                                <p
                                    onClick={() => {
                                        setStepHisotory([...stepHistory, activeStep])
                                        setActiveStep(6)
                                    }}
                                    className="px-2 hover:text-black text-base font-normal text-gray-400 font-pj cursor-pointer"
                                >
                                    Skip
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {activeStep === 6 && (
                <motion.section
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    key="step6"
                >
                    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="w-full">
                            <h4 className="text-center text-2xl font-semibold my-3">Other Courses</h4>
                            <CourseCard data={allCourses} />
                        </div>
                    </div>
                </motion.section>
            )}
        </div>
    )
}

export default Steps
