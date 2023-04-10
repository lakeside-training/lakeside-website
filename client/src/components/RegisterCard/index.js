import React, { useEffect } from "react"
import InputForm from "../InputForm"

// import svg img
import line1 from "../../assets/images/line1.png"
import line2 from "../../assets/images/line2.png"
// ** motion animation imports
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
const RegisterCard = ({ title, inputTitle, placeholder, func, status }) => {
    const scaleVariants = {
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
        }
    }, [controls, inView])
    return (
        <motion.section
            className="py-12 bg-white sm:py-16  lg:py-20"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={scaleVariants}
        >
            <div className="px-1  mx-auto sm:px-10 md:px-16 lg:px-16 xl:px-10 2xl:px-6 scale-95 max-w-7xl">
                <div className="relative max-w-full min-h-[430px] mx-auto overflow-hidden text-center bg-[#151515] rounded-xl md:text-left">
                    <div className="absolute inset-0 flex justify-between">
                        <img
                            className="hidden sm:block w-full h-full object-contain -ml-[1%] "
                            src={line1}
                            alt=""
                        />

                        <img
                            className="hidden sm:block w-full h-full object-contain md:ml-[20%] lg:ml-[40%]"
                            src={line2}
                            alt=""
                        />
                    </div>

                    <div className="relative p-4 sm:py-12 sm:px-16">
                        <div className=" lg:max-w-[50%] mx-auto mt-10">
                            <h3 className="text-3xl font-bold text-white sm:text-4xl text-center mb-10">
                                {/* {title} */}
                            </h3>
                            <div className="mt-4 text-base font-bold text-white flex w-full flex-wrap justify-around gap-1">
                                <div className="flex items-center flex-wrap justify-center ">
                                    <svg
                                        className="w-6 h-6 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <p>10K+ Members</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <p>100+ Courses</p>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <p>Learn Anytime</p>
                                </div>
                            </div>

                            <InputForm
                                title={inputTitle || "Register Now"}
                                placeholder={placeholder || "Enter your email"}
                                func={func && func}
                                status={status}
                            />
                            <p className="mt-8 text-white text-center">{title}</p>
                        </div>
                    </div>
                </div>

                {status == "home" && (
                    <div className="relative">
                        <div className="absolute z-0 transition-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-70 group-hover:duration-300"></div>
                        <Link
                            className={`${status === "home" && "block sm:hidden"}`}
                            to="/steps"
                        >
                            <div className="mt-4 z-10 sm:mt-0  sm:inset-y-0 sm:right-0 flex sm:hidden sm:items-center sm:pr-2">
                                <button
                                    type="submit"
                                    className="inline-flex z-10 active:scale-95 justify-center text-center w-full sm:w-fit hover:scale-[1.02] px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900  rounded-[9.45px]  focus:outline-none focus:bg-gray-600 font-pj "
                                >
                                    Register Now
                                </button>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </motion.section>
    )
}

export default RegisterCard
