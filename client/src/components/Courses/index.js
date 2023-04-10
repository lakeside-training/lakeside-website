/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react"

// ** import third party
import { Link } from "react-router-dom"
// import Carousel from "react-multi-carousel"
// import "react-multi-carousel/lib/styles.css"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// import required modules
import { FreeMode, Pagination } from "swiper"

// ** import images
import aws_course_bg from "../../assets/images/LandingPage/Frame 39282.jpg"
import aws_course_mobile_bg from "../../assets/images/LandingPage/BG.jpg"
import aws_course_img from "../../assets/images/LandingPage/Code.svg"
import aws_course_mobile_img from "../../assets/images/LandingPage/image 27.svg"

// ** import svg icons
import cloud_computing from "../../assets/icons/cloud_computing.svg"
import software_engineering from "../../assets/icons/software_engineering.svg"
import project_management from "../../assets/icons/project_management.svg"
import product_management from "../../assets/icons/product_management.svg"
import information_technology from "../../assets/icons/information_technology.svg"

// ** motion animation imports
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
const Courses = (props) => {
    const selectIco = (title) => {
        return {
            "Cloud Computing": cloud_computing,
            "Software Engineering": software_engineering,
            "Project Management": project_management,
            "Product Management": product_management,
            "Information Technology": information_technology
        }[title]
    }

    const courseList = [
        {
            title: "Cloud Computing",
            image: aws_course_bg,
            link: "#",
            content:
                "The need for organizations to maintain and manage their own physical infrastructure, and allows them to scale their computing resources up or down as needed."
        },
        {
            title: "Software Engineering",
            image: aws_course_bg,
            link: "#",
            content:
                "The discipline of designing, creating, and maintaining software systems. It involves using principles and methods from computer science."
        },
        {
            title: "Project Management",
            image: aws_course_bg,
            link: "#",
            content:
                "The process of planning, organizing, and managing resources to achieve specific goals and objectives within a defined timeline and budget."
        },
        {
            title: "Product Management",
            image: aws_course_bg,
            link: "#",
            content:
                "The process of overseeing the entire lifecycle of a product, from its initial ideation and design to its development, launch, and ongoing maintenance."
        },
        {
            title: "Information Technology",
            image: aws_course_bg,
            link: "#",
            content:
                "The use of computers, software, and networks to process, store, retrieve, and transmit information. It encompasses a wide range of technologies and applications."
        }
    ]

    const [currCourse, setCurrCourse] = useState(0)
    const [toogle, setToogle] = useState(true)

    const handleToogle = () => {
        setToogle(!toogle)
    }

    const cartDetails = [
        {
            id: 1,
            title: "Pick your Masterclass",
            des: "Choose from our range of courses what best suits your career path or job",
            img: aws_course_mobile_bg
        },
        {
            id: 2,
            title: "Pass the Class",
            des: "Absorb the content, pass the test",
            img: aws_course_mobile_bg
        },
        {
            id: 3,
            title: "Interview Prep",
            des: "Be guided on how to improve your CV and your Interview Skills. Land your Dream Job or get your Pay Rise",
            img: aws_course_mobile_bg
        }
    ]

    // ** animation controls
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
    const controls = useAnimation()
    const [ref, inView] = useInView()
    useEffect(() => {
        if (inView) {
            controls.start("visible")
            // controls.stop("hidden");
        }
    }, [controls, inView])
    return (
        <motion.section
            className="py-6 sm:py-16  lg:py-24"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={rightToLeft}
        >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center gap-3 items-center">
                        <h2
                            className={` ${
                                toogle ? " text-gray-900" : "text-gray-300"
                            } cursor-pointer  text-3xl font-bold sm:text-4xl xl:text-5xl font-pj duration-300`}
                            onClick={handleToogle}
                        >
                            Tracks
                        </h2>
                    </div>
                    <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                        Learn about everything in one place
                    </p>
                </div>

                {/* lg:ml-[120px] */}
                <div className="mt-10 pb-10 md:ml-5 lg:!mr-[120px] px-6 sm:px-5 md:px-0 w-full">
                    {/* <Carousel
            showDots
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            responsive={responsive}
          > */}
                    <Swiper
                        // slidesPerView={3}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                            clickable: true
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper flex justify-center pb-5"
                        // slidesPerView={"auto"}
                        // centeredSlides={true}
                        // Responsive breakpoints
                        breakpoints={{
                            // when window width is >= 0px
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50
                            }
                        }}
                    >
                        {courseList.map((i, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        key={index}
                                        className="relative h-[340px] select-none cursor-grab inline-flex mb-10 mt-10 group  rounded-lg shadow-xl shadow-slate-100  "
                                    >
                                        <div
                                            className={`absolute transitiona-all border-2  opacity-0 -inset-px bg-gradient-to-r from-[#44beff37] via-[#ff44ec3a] to-[#ff665e37] rounded-xl blur-lg
                  ${currCourse === index ? "opacity-100" : ""}
                  group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
                                        ></div>

                                        <div
                                            className={`transition-all relative  ${
                                                currCourse === index ? "opacity-100 !border-gray-500 border" : ""
                                            } duration-200 min-h-full max-h-[343.98px] min-w-full max-w-[340.95px] bg-white border-2 border-transparent  rounded-lg cursor-grab z-20 overflow-hidden`}
                                            onClick={() => setCurrCourse(index)}
                                        >
                                            <div className="py-10 px-9">
                                                <img
                                                    src={selectIco(i.title)}
                                                    alt={i.title}
                                                />
                                                <h3 className="mt-8 text-lg font-semibold text-black">{i.title}</h3>
                                                <p className="mt-4 text-base text-gray-600">{i.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                        <SwiperSlide>
                            <Link to="/courses">
                                <div className="relative overflow-hidden !w-[340px] !min-h-[330px] max-w-[340px] align-middle  cursor-grab inline-flex mb-10 mt-10  mx-3 group  rounded-lg shadow-xl shadow-slate-100 opacity-100  border-2 border-transparent active:border-gray-500 ">
                                    <div
                                        className={`absolute  !h-[85%] transition-all opacity-0 -inset-px bg-gradient-to-r from-[#44beff37] via-[#ff44ec3a] to-[#ff665e37] rounded-xl blur-lg
                  
                  group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt`}
                                    ></div>
                                    <div
                                        // max-w-[340px]  !min-h-[330px] min-w-[40vw] sm:min-w-[35vw] md:min-w-[22vw]
                                        className={`absolute top-0 left-0 bottom-0 transition-all cursor-grab flex flex-col justify-center items-center duration-200  bg-white w-full border-2 border-transparent  rounded-lg z-20`}
                                    >
                                        <div className="w-[50px] cursor-pointer  h-[50px] rounded-3xl flex justify-center items-center border-2 border-black">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                />
                                            </svg>
                                        </div>
                                        <p className="cursor-pointer">View All</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                    {/* </Carousel> */}
                </div>
            </div>
            <div className="relative flex flex-wrap justify-center items-center my-5 w-[90%] sm:w-[60%] md:w-[90%] max-w-6xl mx-auto py-[30px] rounded-2xl">
                {/* xl:w-[70%] 2xl:w-[50%] 3xl:w-[30%] */}
                {/* <img
          src={courseList[currCourse]?.image}
          alt={courseList[currCourse]?.title}
          className="w-[90%] 2xl:w-[55%] hidden ms:flex"
        />
        <img
          src={courseList[currCourse]?.phoneImage}
          alt={courseList[currCourse]?.title}
          className="w-[90%] flex ms:hidden"
        /> */}
                <div className="absolute w-[100%] block md:hidden h-[100%] left-0 top-0 z-10">
                    <img
                        className="w-[100%] h-[100%]"
                        src={aws_course_mobile_bg}
                        alt=""
                    />
                </div>
                <div className="absolute w-[100%] hidden md:block h-[100%] left-0 top-0 z-10">
                    <img
                        className="w-[100%] h-[100%] block"
                        src={aws_course_bg}
                        alt=""
                    />
                </div>
                <div className="w-[90%] block md:hidden mx-auto md:mx-0 md:mt-0 xl:w-[50%] z-20 h-[100%]">
                    <img
                        className="!w-[110%] !h-[110%]"
                        src={aws_course_mobile_img}
                        alt=""
                    />
                </div>
                <div className=" w-[100%] sm:w-[90%] mx-auto pv-[10px] mt-10 xl:mt-0 xl:mx-0 md:w-[50%] z-20 h-[100%] flex flex-col justify-center items-center">
                    <div className="">
                        <div className="flex flex-col justify-start items-start">
                            {cartDetails.map((data, index) => {
                                return (
                                    <div
                                        key={`cart-${index}`}
                                        className={`flex ${index !== 2 ? "mb-10" : ""}`}
                                    >
                                        <svg
                                            width="37"
                                            height="38"
                                            viewBox="0 0 37 38"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-[30px] h-[30px] ml-[5%] md:ml-[3%]"
                                            preserveAspectRatio="none"
                                        >
                                            <rect
                                                y="0.780029"
                                                width="36.855"
                                                height="36.855"
                                                rx="18.4275"
                                                fill="white"
                                            ></rect>
                                            <path
                                                d="M12.2852 19.8148L15.5252 23.0548L23.6252 14.9548"
                                                stroke="black"
                                                strokeWidth="1.89"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                        <div className="ml-5 w-[70%]">
                                            <p className="flex-grow-0 flex-shrink-0 text-[17.010000228881836px] font-bold text-left text-white">
                                                {data.title}
                                            </p>
                                            <p className="lg:w-[343.04px] text-[15.119999885559082px] text-left text-zinc-200">
                                                {data.des}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:mx-0 mt-10 xl:mt-0 md:w-[50%]  z-20 h-[100%]">
                    <img
                        className="w-full h-full"
                        src={aws_course_img}
                        alt=""
                    />
                </div>
            </div>
            <div className="mt-8 text-center sm:mt-12">
                <div className="relative inline-flex group">
                    <div
                        className="absolute duration-1000 rotate-180 transitiona-all opacity-70 -inset-px rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"
                        style={{
                            background:
                                "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                        }}
                    ></div>

                    <Link to="/steps">
                        <a
                            className=" active:scale-95 hover:scale-[1.02]  relative inline-flex items-center justify-center py-3.5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent px-12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
                            role="button"
                            alt="#"
                        >
                            Get Started
                        </a>
                    </Link>
                </div>
            </div>
        </motion.section>
    )
}

export default Courses
