import React, { useEffect } from "react"

// ** import customm icons
import { ReactComponent as LineBarV } from "../../assets/icons/line-bars-vertical.svg"

// ** import images for hero
import heroImage from "../../assets/images/heroMain.svg"
import InputForm from "../../components/InputForm"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Hero = () => {
    const scaleVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.5,
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
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={scaleVariants}
        >
            {/* <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
        />
      </div> */}

            <section className="z-10 pt-12 sm:pt-16 lg:pt-20">
                <div className="overflow-hidden !mx-auto ">
                    <div className="mx-auto w-[95%] sm:px-14 2xl:w-[87%] max-w-7xl 3xl:w-[60%] flex gap-4 flex-col lg:flex-row lg:items-center">
                        {/* hero man image */}
                        <div className="w-[95%] mx-auto lg:mx-0 lg:w-[50%] flex justify-end lg:hidden">
                            <img
                                className="z-10 w-full mt-5 mb-5 lg:mt-0 lg:mr-[-5%]"
                                src={heroImage}
                                alt=""
                            />
                        </div>
                        <div className="w-[95%] pt-0  mx-auto lg:mx-0 lg:w-[55%] flex flex-col items-start">
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-[52px] font-pj">
                                    Join the most progressive IT Learning Platform
                                </h1>

                                <p className=" text-2xl text-gray-600 mt-2 sm:mt-4 font-inter">
                                    To Learn with tutors in a live environment and resources curated to create an
                                    optimal learning experience.
                                </p>
                                <p className=" text-lg text-gray-600 mt-2 sm:mt-8 font-inter">
                                    Upskilling minorities with accessible and up to date content, With an emphasis on
                                    Resource-Based Learning & Career Workshops.
                                </p>
                                {/* <div className="relative inline-flex mt-10 group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href="#"
                    title=""
                    className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Get Started
                  </a>
                </div> */}
                                <InputForm
                                    placeholder={"amyadams@gmail.com"}
                                    title="Get Started"
                                />
                            </div>

                            <div className="flex max-ms:flex-wrap items-center justify-center mt-10 ms:space-x-6 lg:justify-start sm:space-x-8">
                                <div className="flex gap-2 items-center">
                                    <p className="text-2xl xs:text-3xl font-medium text-gray-900 sm:text-4xl font-pj">
                                        100+
                                    </p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Courses Delivered</p>
                                </div>

                                <div className="hidden sm:block">
                                    <LineBarV />
                                </div>

                                <div className="mt-2 ms:mt-0 flex items-center">
                                    <p className="text-2xl xs:text-3xl  font-medium text-gray-900 sm:text-4xl font-pj">
                                        10K+
                                    </p>
                                    <p className="ml-3 text-sm text-gray-900 font-pj">Community Memebers</p>
                                </div>
                            </div>
                        </div>

                        {/* hero man image */}
                        <div className="w-[95%] mx-auto lg:mx-0 lg:w-[45%] hidden  lg:flex">
                            <img
                                className="z-10 w-[100%] mt-5 lg:mt-0 lg:mr-[-5%]"
                                src={heroImage}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Hero
