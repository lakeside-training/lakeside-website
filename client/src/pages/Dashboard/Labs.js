/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"

// ** import images
// import course1 from "../../assets/images/courses/course3.png"
// import course2 from "../../assets/images/courses/course2.png"
// import course3 from "../../assets/images/courses/course1.png"
// import course4 from "../../assets/images/courses/course4.png"

// ** import third party components
import { Button } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"

import { Accordion } from "flowbite-react"

import Spinner from "../../components/spinner/Spinner"
import axios from "../../axios"
import { Modal } from "flowbite-react"
import { XCircle } from "react-feather"
import Lab from "./Lab"

const Labs = () => {
    const [accordionStatus, setAccordionStatus] = useState(false)
    const [course, setCourse] = useState(null)
    const [buyCourses, setBuyCourses] = useState(null)
    const defaultStatus = localStorage.getItem("defaultStatus")
    const [changesCourse, setChangesCourse] = useState("")
    const userID = JSON.parse(localStorage.getItem("userInfo"))
    const [show, setShow] = useState(false)
    const [youtubeId, setId] = useState("")
    const [mp4Link, setmp4Link] = useState("")
    const [videoType, setVideoType] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()
    const [link, setLink] = useState([])
    const [imageLink, setImageLink] = useState("")
    const [firstLabs, setFirstLabs] = useState([])

    console.log(changesCourse)

    useEffect(() => {
        const Status = async () => {
            const { data } = await axios.post("/getParticular/courseStatus", {
                userId: userID?.[0].id
            })

            setFirstLabs(data.data)
        }

        Status()
    }, [])

    const updateStatus = async (id) => {
        const { data } = await axios.post("/editParicularCourse", {
            userId: userID?.[0].id,
            courseId: id
        })

        console.log(data)
    }

    // toggle
    const toggle = () => setShow(!show)

    useEffect(() => {
        const API = async () => {
            const { data } = await axios.post("/userCourse/getCourse", {
                user_id: userID?.[0].id,
                value: "lab"
            })

            const enable = data.data.filter((i) => i.lab_enable === "true")

            const filter = enable.filter((i) => i.lab_type === "Lab")
            setBuyCourses(filter)
        }
        API()
    }, [])

    useEffect(() => {
        const API = async () => {
            const { data } = await axios.get("/resources/all")
            setLink(data.data)
        }
        API()
    }, [])

    // if (defaultStatus === "false") {
    // 	const defaultCourse = async () => {
    // 		const { data } = await axios.post("/default/courses", {
    // 			name: localStorage.getItem("plan"),
    // 			paymentId: localStorage.getItem("paymentId"),
    // 			id: userID?.[0].id,
    // 			course_id: "c3b2bbf3-cb40-4dc3-b0f0-d85b77880bc4",
    // 		});
    // 		setChangesCourse(data);
    // 	};
    // 	defaultCourse();
    // 	localStorage.setItem("defaultStatus", "true");
    // }

    const handleSelectCourse = (id) => {
        setAccordionStatus(!accordionStatus)

        const getCourseData = async () => {
            const { data } = await axios.post("/getParticular/lab/data", { id })
            console.log("data.data", data)
            setCourse(data.data)
        }
        getCourseData()
    }

    useEffect(() => {
        const url = window.location.href
        if (url) {
            const arr = url.split("=")
            if (arr?.length > 1) {
                handleSelectCourse(arr[1])
            }
        }
    }, [])

    const isYouTubeLink = (link) => {
        return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(link)
    }

    const isMp4 = (link) => {
        const mp4 = /\.mp4$/.test(link)
        const ogv = /\.ogv$/.test(link)
        const webm = /\.webm$/.test(link)

        if (mp4) {
            setVideoType("mp4")
            return true
        } else if (ogv) {
            setVideoType("ogg")
            return true
        } else if (webm) {
            setVideoType("webm")
            return true
        } else {
            return false
        }
    }

    const checkImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null
    }

    const checkLink = async (link) => {
        const youtube = await isYouTubeLink(link)
        const mp4 = await isMp4(link)
        const image = await checkImage(link)

        if (youtube) {
            const arr = link.split("=")
            if (arr?.length > 1) {
                setmp4Link("")
                setId(arr[1])
                setShow(true)
            }
        }
        if (mp4) {
            setId("")
            setmp4Link(link)
            setShow(true)
        }
        if (image) {
            setId("")
            setImageLink(link)
            setShow(true)
        }

        if (!mp4 && !youtube && !image) {
            setId("")
            setmp4Link("")
            const win = window.open(link, "_blank")
            win.focus()
        }
    }

    return (
        <div onClick={() => setShow(false)}>
            {buyCourses === null ? (
                <>
                    <div className="w-full h-[60vh] justify-center flex items-center">
                        <Spinner />
                    </div>
                </>
            ) : buyCourses.length === 0 ? (
                <>
                    <div className="mx-auto text-center mt-20">
                        <p className=" text-xl font-semibold text-center text-gray-900">
                            You have not purchased any lab yet!☹️
                        </p>
                        <Link to="/labPage">
                            <button className="inline-flex z-10 mt-5  active:scale-95 justify-center text-center hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black rounded-xl focus:outline-none focus:bg-black font-pj ">
                                Buy Lab
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    {accordionStatus === false ? (
                        <>
                            {/* {type === "Course" ? (
                <> */}
                            <div className="flex w-full  h-full justify-start flex-wrap gap-4 mt-12">
                                {buyCourses.map((data) => {
                                    return (
                                        <div className=" relative  w-72 mx-auto sm:mx-0 md:w-80 xl:w-72 border shadow-lg shadow-[rgba(0, 0, 0, 0.1)] rounded overflow-hidden flex flex-col justify-between py-3">
                                            <div>
                                                {/* <div className="right-4 top-3 absolute border mb-5 px-2 h-7 border-[#4F46E5] bg-indigo-200 rounded-xl flex justify-start ">
                          <p className="text-[#4F46E5] text-sm mt-0.5">22%</p>
                        </div> */}
                                                <div className="m-5">
                                                    <img
                                                        className="w-[70%] m-auto block"
                                                        src={data.lab_icon ? data.lab_icon : data.course_icon}
                                                        alt={data.name}
                                                    />
                                                </div>
                                                <div className="px-6 py-3">
                                                    <div className="font-bold font-manrope text-l mb-2">
                                                        {data?.name}
                                                    </div>
                                                    <div className=" h-[100%] max-h-[85px] w-[100%] ">
                                                        <div className="text-gray-500 line-clamp-3 text-sm">
                                                            {data?.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons w-full mt-[10px]">
                                                {/* <Button
                          onClick={() => {
                            if (data.lab_type === "Lab") {
                              navigate(`/lab-knowledge?id=${data.id}`);
                            } else {
                              handleSelectCourse(data?.id);
                              setType(data.course_type);
                            }
                          }}
                          className="bg-black px-10 m-auto block overflow-auto !normal-case"
                          variant="gradient"
                        >
                          Continue Lab
                        </Button> */}
                                                <Button
                                                    onClick={() => {
                                                        handleSelectCourse(data?.id)
                                                        setType(data.lab_type)
                                                        setChangesCourse(data.id)
                                                        updateStatus(data.id)
                                                    }}
                                                    className="bg-black px-10 m-auto block overflow-auto !normal-case"
                                                    variant="gradient"
                                                >
                                                    {firstLabs.find((i) => i.course_id === data?.id)?.start + " Lab" ??
                                                        null}
                                                </Button>
                                                <Link
                                                    to={`/course-details?id=${data.id}&hide=hide&status=lab&course=mycourse`}
                                                >
                                                    <Button
                                                        className="text-slate-700 block m-auto mt-3 overflow-auto !normal-case"
                                                        variant="text"
                                                    >
                                                        Lab Details
                                                    </Button>
                                                </Link>
                                                <div className="text-center">
                                                    <p>Duration {data.duration} hours</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* </>
              ) : (
                <>
                  <Lab />
                </>
              )} */}
                        </>
                    ) : (
                        // w-[95%] 2xl:w-[87%] xl:w-[95%]
                        <div className="flex flex-col flex-1 mx-auto">
                            <Modal
                                show={show}
                                onClose={toggle}
                            >
                                <div className="video-model relative">
                                    <Modal.Body>
                                        <XCircle
                                            className="absolute top-[-25px] right-[-25px] cursor-pointer"
                                            size={30}
                                            onClick={() => setShow(false)}
                                        />
                                        {mp4Link !== "" && (
                                            <video
                                                className="w-full"
                                                autoPlay={true}
                                                controls
                                            >
                                                <source
                                                    className="w-full"
                                                    src={mp4Link}
                                                    type={`video/${videoType}`}
                                                />
                                            </video>
                                        )}
                                        {youtubeId !== "" && (
                                            <div className="space-y-6 text-center">
                                                <iframe
                                                    className="w-full"
                                                    height="315"
                                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                                    title="YouTube video player"
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowfullscreen
                                                ></iframe>
                                            </div>
                                        )}
                                        {imageLink !== "" && (
                                            <img
                                                src={imageLink}
                                                className="w-full h-full"
                                                alt=""
                                            />
                                        )}
                                    </Modal.Body>
                                </div>
                            </Modal>
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

                            <div className="flex mt-3 px-2 justify-between items-center flex-col md:flex-row mb-2">
                                <div className="flex">
                                    <h3 className="font-bold font-manrope text-lg">{course?.name}</h3>
                                    {/* <div className="ml-4 border mb-5 px-2 py-1 border-[#4F46E5] bg-indigo-200 rounded-xl flex justify-center items-center">
                    <p className="text-[#4F46E5] text-xs">22%</p>
                  </div> */}
                                </div>
                                <div className="flex items-center">
                                    <p
                                        onClick={() =>
                                            navigate(
                                                `/labs/certification?name=${
                                                    userID?.[0].firstName + userID?.[0].lastName
                                                }&courseName=${course?.name}`
                                            )
                                        }
                                        className="text-[#4F46E5] text-md cursor-pointer mx-6"
                                    >
                                        View Certificate
                                    </p>

                                    <button
                                        onClick={() => navigate(`/lab-knowledge?id=${changesCourse}`)}
                                        className="bg-[#4F46E5] text-white rounded-lg font-semibold text-md cursor-pointer py-3 px-5"
                                    >
                                        Go to Lab
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto pb-5 px-2">
                                {course?.lab_modules?.map((data, index) => {
                                    return (
                                        <div className=" mt-4">
                                            <div className="flex items-center justify-between py-3 px-2 ">
                                                <div className="flex items-center ">
                                                    <div className="rounded-2xl text-xs flex justify-center items-center w-6 h-6 text-white bg-black">
                                                        {index + 1}
                                                        {console.log(data)}
                                                    </div>

                                                    <div className="mx-6">
                                                        <h2 className="text-sm md:text-base font-bold text-gray-900 ">
                                                            {data.moduleHeading}
                                                        </h2>
                                                        <p className="text-xs md:text-sm hidden md:block text-gray-500">
                                                            {data?.moduleDiscription?.slice(0, 60)}...
                                                        </p>
                                                        <p className="text-sm text-gray-500 md:hidden ">
                                                            {data?.moduleDiscription?.slice(0, 30)}...
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="md:w-[10%] text-[#4F46E5] text-md font-semibold hidden md:flex items-center cursor-pointer">
                                                    <div
                                                        onClick={() => {
                                                            link.filter(
                                                                (i) => i.id === data.resourse && checkLink(i?.link)
                                                            )
                                                        }}
                                                        className={` cursor-pointer 
																				"text-[#4F46E5] border-[#4F46E5] bg-[#4e46e54d] border py-[2px] px-3 rounded-xl flex justify-center items-center`}
                                                    >
                                                        <p className={`text-[#4F46E5] text-sm`}>View</p>
                                                    </div>
                                                </div>
                                                <div className="md:w-[10%] text-md font-semibold hidden md:flex items-center cursor-pointer">
                                                    <div>
                                                        <p className={` text-sm`}>
                                                            {data.questions.length}
                                                            <span className="mx-2">Questions</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Labs
