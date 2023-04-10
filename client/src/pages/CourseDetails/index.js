/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import axios from "../../axios"

// import components or page
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer/index"
import CarouselBtn from "../../components/CarouselBtn"
import Spinner from "../../components/spinner/Spinner"

// import third parity components
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
// import images
// import cartMan from "../../assets/images/course-details/cartMan.png"
import ellipse1 from "../../assets/images/course-details/Ellipse1.png"
import ellipse2 from "../../assets/images/course-details/Ellipse2.png"
import ellipse3 from "../../assets/images/course-details/Ellipse3.png"
import ellipse4 from "../../assets/images/course-details/Ellipse4.png"
import { useSelector } from "react-redux"

const CourseDetails = () => {
    const navigation = useNavigate()

    const { auth } = useSelector((state) => state.auth)
    const [searchParams] = useSearchParams()
    const courseID = searchParams.get("id")
    const status = searchParams.get("hide")
    const mycourse = searchParams.get("course")
    const condition = searchParams.get("status")
    const [coursedata, setCourseData] = useState(null)
    const storage = localStorage.getItem("userInfo")
    const [paymentButtonStatus, setPaymentButtonStatus] = useState(false)
    const userID = JSON.parse(localStorage.getItem("userInfo"))
    localStorage.setItem("courseStatus", false)

    console.log("print", coursedata)

    useEffect(() => {
        localStorage.setItem("courseId", courseID)
        const getCourseDetails = async () => {
            if (condition !== null) {
                try {
                    const { data } = await axios.post("/getParticular/lab/data", {
                        id: courseID
                    })
                    if (data.success) {
                        console.log(data)

                        setCourseData(data?.data)
                    } else {
                        toast.error(data.status)
                        navigation("/labPage")
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("course not fond!")
                    // navigation("/courses");
                }
            } else {
                try {
                    const { data } = await axios.post("/getParticular/data", {
                        id: courseID
                    })
                    if (data.success) {
                        console.log(data)
                        setCourseData(data?.data)
                    } else {
                        toast.error(data.status)
                        navigation("/courses")
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("course not fond!")
                    // navigation("/courses");
                }
            }
        }

        getCourseDetails()
    }, [])

    if (coursedata !== null) {
        localStorage.setItem("price", coursedata?.discount_price)
    }

    const payment = async () => {
        const { data } = await axios.post("/userCourse/getParticularCourese/Details", {
            user_id: userID[0].id,
            course_id: courseID
        })
        if (data.data === 0) {
            const { data } = await axios.post("/buyCourse", {
                amount: coursedata?.discount_price,
                name: coursedata?.name
            })
            if (data) {
                localStorage.setItem("paymentId", data.id)
                return (window.location = data.url)
            }
        } else {
            toast.success(`Course already exists`)

            // const updatedata = await axios.post('/userCourse/update', {
            //   _id: userID[0].id,
            //   user_id: userID[0].id,
            //   course_id: id,
            //   payment_status: "",
            //   payment_id: ""
            // })
            // localStorage.setItem('buyingId', data.id)
            // if(updatedata.data === 'Successfully Updated'){
            //   const {data} = await axios.post('/buyCourse', {
            //     amount : coursedata.discount_price,
            //     name: coursedata.name
            //   })
            //   if (data) {
            //     localStorage.setItem('paymentId', data.id)
            //    return window.location = data.url
            //   }
            // }
        }
    }

    const process = async () => {
        const { data } = await axios.post("/userCourse/getParticularCourese/Details", {
            user_id: userID[0].id,
            course_id: courseID
        })

        if (data.data === 0) {
            const { data } = await axios.post("/paypalPay", {
                price: coursedata?.discount_price,
                name: coursedata?.name
            })
            if (data) {
                localStorage.setItem("paymentId", data.id)
                return (window.location = data)
            }
        } else {
            toast.success(`Course already exists`)
        }
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3.2
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2.2
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1.2
        }
    }

    const checkCourse = async () => {
        const { data } = await axios.post("/userCourse/getParticularCourese/Details", {
            user_id: userID[0].id,
            course_id: courseID
        })
        if (data.data !== 0) {
            navigation(`/dashboard?id=${coursedata.id}`)
        } else {
            setPaymentButtonStatus(!paymentButtonStatus)
        }
    }

    return (
        <>
            <Navbar />

            {coursedata === null ? (
                <div style={{ marginLeft: "45%", marginBottom: "50%", marginTop: "10%" }}>
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="flex flex-col flex-1 xl:px-10">
                        {/* Navbar */}
                        {/* {!storage && <Navbar /> } */}

                        {/* Course Details */}
                        <div className="!mx-auto sm:px-12 w-[95%]  max-w-7xl">
                            {/* w-[95%] 2xl:w-[87%] 3xl:w-[60%] */}
                            <div className="mx-auto flex flex-col flex-1">
                                {auth !== null && Object.keys(auth).length !== 0 ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="flex mt-5"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-4 mr-1 mt-1"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                            Back to My Courses
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/courses"
                                            className="flex mt-5"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-4 mr-1 mt-1"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                            Back
                                        </Link>
                                    </>
                                )}

                                <div className="w-full flex flex-wrap">
                                    {/** In mobile cart*/}
                                    <div className="w-[95%] mx-auto sm:w-[70%] mt-10 md:mt-0 md:mx-0 md:w-[50%] flex md:hidden justify-center items-center">
                                        <div className="relative">
                                            <div className="absolute -inset-2">
                                                <div
                                                    className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
                                                    style={{
                                                        background:
                                                            "linear-gradient(90deg, #ebff70 20%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #44ff9a -0.55%)"
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="relative flex flex-col justify-end items-start sm-[80%] lg:w-[100%] overflow-hidden h-[auto] gap-[29px] p-4 rounded-lg bg-white">
                                                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[100%] h-[auto] gap-[7.559878349304199px] rounded-md">
                                                    {coursedata?.lab_image ? (
                                                        <img
                                                            src={coursedata?.lab_image}
                                                            className="w-full h-full"
                                                            alt={coursedata?.name || "lab image"}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={coursedata.course_image}
                                                            className="w-full h-full"
                                                            alt={coursedata?.name || "course image"}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex justify-start items-center w-[100%] overflow-hidden">
                                                    {status === "hide" ? null : (
                                                        <div className="flex justify-start items-center gap-[5px] w-[40%]">
                                                            <p className="flex-grow-0 text-[31px] flex-shrink-0 text-[base] font-bold text-left text-[#1e1e1e]">
                                                                ${coursedata?.discount_price}
                                                            </p>
                                                            <p className="flex-grow-0 text-[31px] flex-shrink-0 text-sm font-medium text-left text-[#747474]">
                                                                ${coursedata?.price}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-end items-center flex-grow-0 flex-shrink-0 w-[60%]">
                                                        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative space-x-[-16.064741134643555px]">
                                                            {/* <img src={ellipse1} alt="" />
                        <img src={ellipse2} alt="" />
                        <img src={ellipse3} alt="" />
                        <img
                          className="flex-grow-0 flex-shrink-0"
                          src={ellipse4}
                          alt=""
                        /> */}
                                                        </div>
                                                        <p className="flex-grow-0 text-[13.23px] flex-shrink-0 text-xs text-left text-slate-500">
                                                            Join 523+ Learners
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-start w-[100%]">
                                                    <div className="flex flex-col justify-start items-start">
                                                        <p className="flex-grow-0 text-[20px] flex-shrink-0 font-medium text-right text-[#242424]">
                                                            {condition !== null
                                                                ? coursedata.lab_modules.length
                                                                : coursedata?.modules?.length}{" "}
                                                            ({coursedata?.duration})
                                                        </p>
                                                        <p className="flex-grow-0 flex-shrink-0 text-[16px] font-medium text-left text-[#7c7c7c]">
                                                            Modules
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col justify-start items-start">
                                                        <p className="flex-grow-0 text-[20px] flex-shrink-0 font-medium text-right text-[#242424]">
                                                            Scientific Thinking
                                                        </p>
                                                        <p className="flex-grow-0 text-right flex-shrink-0 text-[16px] font-medium text-left text-[#7c7c7c]">
                                                            Category
                                                        </p>
                                                    </div>
                                                </div>
                                                {storage && (
                                                    <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 w-[100%] m-auto cursor-pointer gap-1 rounded-[10px]">
                                                        <button
                                                            onClick={() => {
                                                                setPaymentButtonStatus(!paymentButtonStatus)
                                                            }}
                                                            type="submit"
                                                            className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                        >
                                                            {mycourse !== null
                                                                ? condition !== null
                                                                    ? "View Lab"
                                                                    : "View Course"
                                                                : "Enroll now"}
                                                        </button>

                                                        {paymentButtonStatus === true && (
                                                            <div className="w-[100%] flex gap-5 p-[10px]">
                                                                <button
                                                                    type="submit"
                                                                    onClick={payment}
                                                                    className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                                >
                                                                    Stripe
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    onClick={process}
                                                                    className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                                >
                                                                    Paypal
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 mx-auto w-[95%] text-justify sm:text-start md:mx-0 sm:w-[70%] md:w-[50%] pt-10">
                                        <h1 className="text-3xl font-bold">{coursedata?.name}</h1>
                                        <p className="text-[#52525B] text-sm sm:text-base mt-5 sm:mt-8">
                                            {coursedata?.description}
                                        </p>

                                        <div className="flex flex-wrap mt-5 md:mt-4 sm:mt-10 justify-start items-start w-[100%] gap-[7.559878349304199px]">
                                            {condition !== null ? (
                                                <>
                                                    {coursedata?.lab_tags?.map((data) => {
                                                        return (
                                                            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[7.5px] px-3 py-[6px] rounded-full bg-transparent border border-black cursor-pointer">
                                                                <p className=" text-base text-left text-black">
                                                                    {data}
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                    {coursedata?.course_tags?.map((data) => {
                                                        return (
                                                            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[7.5px] px-3 py-[4px] rounded-full bg-transparent border border-black cursor-pointer">
                                                                <p className="flex-grow-0 flex-shrink-0 text-base text-left text-black">
                                                                    {data}
                                                                </p>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/** In desktop cart*/}
                                    <div className="w-[95%] mx-auto sm:w-[70%] mt-10 md:mt-0 md:mx-0 md:w-[50%] hidden md:flex justify-end items-center">
                                        <div className="relative w-[80%]">
                                            <div className="absolute -inset-2">
                                                <div
                                                    className="w-full h-full mx-auto rounded-3xl opacity-30 blur-lg filter"
                                                    style={{
                                                        background:
                                                            "linear-gradient(90deg, #ebff70 20%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #44ff9a -0.55%)"
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="relative flex flex-col justify-end items-start sm-[80%] lg:w-[100%] overflow-hidden h-[auto] gap-[29px] p-4 rounded-lg bg-white">
                                                <div className="w-[90%] mx-auto flex justify-center items-center flex-grow-0 flex-shrink-0 h-[auto] gap-[7.559878349304199px] rounded-md">
                                                    {coursedata.lab_image ? (
                                                        <img
                                                            src={coursedata?.lab_image}
                                                            className="w-full h-full"
                                                            alt={coursedata?.name || "lab image"}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={coursedata?.course_image}
                                                            className="w-full h-full"
                                                            alt={coursedata?.name || "course image"}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex justify-start items-center w-[100%] overflow-hidden">
                                                    {status === "hide" ? null : (
                                                        <div className="flex justify-start items-center gap-[5px] w-[40%]">
                                                            <p className="flex-grow-0 text-[31px] flex-shrink-0 text-[base] font-bold text-left text-[#1e1e1e]">
                                                                ${coursedata?.discount_price}
                                                            </p>
                                                            <p className="flex-grow-0 text-[31px] flex-shrink-0 text-sm font-medium text-left text-[#747474]">
                                                                ${coursedata?.price}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`flex justify-end items-center flex-grow-0 flex-shrink-0 ${
                                                            status === "hide" ? "w-[100%]" : "w-[60%]"
                                                        } `}
                                                    >
                                                        <div
                                                            className={`flex justify-start items-start flex-grow-0 flex-shrink-0 relative
                            ${status === "hide" ? "space-x-[-6px]" : "space-x-[-16.064741134643555px]"} `}
                                                        >
                                                            <img
                                                                src={ellipse1}
                                                                alt=""
                                                            />
                                                            <img
                                                                src={ellipse2}
                                                                alt=""
                                                            />
                                                            <img
                                                                src={ellipse3}
                                                                alt=""
                                                            />
                                                            <img
                                                                className="flex-grow-0 flex-shrink-0"
                                                                src={ellipse4}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <p className="flex-grow-0 text-[13.23px] flex-shrink-0 text-xs text-left text-slate-500">
                                                            Join 523+ Learners
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-start w-[100%]">
                                                    <div className="flex flex-col justify-start items-start">
                                                        <p className="flex-grow-0 text-[20px] flex-shrink-0 font-medium text-right text-[#242424]">
                                                            {condition !== null
                                                                ? coursedata?.lab_modules.length
                                                                : coursedata?.modules?.length}{" "}
                                                            ({coursedata?.duration})
                                                        </p>
                                                        <p className="flex-grow-0 flex-shrink-0 text-[16px] font-medium text-left text-[#7c7c7c]">
                                                            Modules
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col justify-start items-start">
                                                        <p className="flex-grow-0 text-[20px] flex-shrink-0 font-medium text-right text-[#242424]">
                                                            {/* Scientific Thinking */}
                                                            {condition !== null
                                                                ? coursedata?.lab_type
                                                                : coursedata?.course_type}
                                                        </p>
                                                        <p className="flex-grow-0 text-right flex-shrink-0 text-[16px] font-medium text-[#7c7c7c]">
                                                            Category
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-end items-end w-full">
                                                    <p className="flex-grow-0 text-[20px] flex-shrink-0 font-medium text-right text-[#242424]">
                                                        {new Date(coursedata?.createdAt).toDateString().substring(3)}
                                                    </p>
                                                    <p className="flex-grow-0 text-right flex-shrink-0 text-[16px] font-medium text-[#7c7c7c]">
                                                        Created
                                                    </p>
                                                </div>
                                                {storage ? (
                                                    <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 w-[100%] m-auto cursor-pointer gap-1 rounded-[10px]">
                                                        <button
                                                            onClick={() => {
                                                                checkCourse()
                                                            }}
                                                            type="submit"
                                                            className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                        >
                                                            {mycourse !== null
                                                                ? condition !== null
                                                                    ? "View Lab"
                                                                    : "View Course"
                                                                : "Enroll now"}
                                                        </button>

                                                        {paymentButtonStatus === true && (
                                                            <div className="w-[100%] flex gap-5 p-[10px]">
                                                                <button
                                                                    type="submit"
                                                                    onClick={payment}
                                                                    className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                                >
                                                                    Stripe
                                                                </button>
                                                                <button
                                                                    onClick={process}
                                                                    type="submit"
                                                                    className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                                >
                                                                    Paypal
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            navigation("/steps")
                                                        }}
                                                        className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-full hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj "
                                                    >
                                                        Register
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 py-14 w-[100%] bg-[#18181B]">
                        <div className="mx-auto sm:px-16 md:px-10 2xl:px-28 px-8 w-[95%] 2xl:w-[87%] 3xl:w-[60%] flex flex-col flex-1  relative">
                            <h1 className="text-2xl mb-5 text-white font-bold">Modules</h1>

                            {coursedata?.lab_modules !== undefined ? (
                                <>
                                    <Carousel
                                        customButtonGroup={<CarouselBtn />}
                                        renderButtonGroupOutside={true}
                                        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                                        responsive={responsive}
                                    >
                                        {coursedata?.lab_modules?.map((data, index) => {
                                            return (
                                                <div className="mx-0 md:mx-4 p-8 max-sm:w-[278px] max-w-[340px] h-[337px] rounded bg-white">
                                                    <div className="w-[40px] h-[40px] rounded-3xl bg-[#4F46E6] flex justify-center items-center text-white">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="mt-5 text-base text-[22px] font-semibold">
                                                        {data?.moduleHeading}
                                                    </h3>
                                                    <p className="text-xs my-3 text-[16px] font-semibold text-[#525252]">
                                                        {data?.questions?.length} Questions
                                                    </p>
                                                    <div className="overflow-hidden h-[58%] text-md flex">
                                                        <p className="text-xs mt-3 text-[16px] line-clamp-6 leading-6 text-gray-600 font-plus_jakarta_sans">
                                                            {data?.moduleDiscription}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </>
                            ) : (
                                <>
                                    <Carousel
                                        customButtonGroup={<CarouselBtn />}
                                        renderButtonGroupOutside={true}
                                        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                                        responsive={responsive}
                                    >
                                        {coursedata?.modules?.map((course, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mx-0 md:mx-4 p-8 max-sm:w-[278px] max-w-[340px] h-[337px] rounded bg-white"
                                                >
                                                    <div className="w-[40px] h-[40px] rounded-3xl bg-[#4F46E6] flex justify-center items-center text-white">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="mt-5 text-base text-[22px] font-semibold">
                                                        {course?.moduleHeading}
                                                    </h3>
                                                    <p className="text-xs my-3 text-[16px] font-semibold text-[#525252]">
                                                        {course?.resourse?.length} Concepts
                                                    </p>
                                                    <div className="overflow-hidden h-[58%] text-md flex">
                                                        <p className="text-xs mt-3 text-[16px] line-clamp-6 leading-6 text-gray-600 font-plus_jakarta_sans">
                                                            {course?.moduleDiscription}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-col flex-1 xl:px-10">
                <Footer />
            </div>
        </>
    )
}

export default CourseDetails
