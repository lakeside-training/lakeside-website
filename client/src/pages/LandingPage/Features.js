import React, { useEffect } from "react"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// import required modules
import { FreeMode, Pagination } from "swiper"

import features1 from "../../assets/images/features1.png"
import features2 from "../../assets/images/features2.png"
import features3 from "../../assets/images/features3.png"
import features4 from "../../assets/images/features4.png"

// ** motion animation imports
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Features = () => {
    const features = [
        {
            title: "Learn Live, from the best in the industry",
            description:
                "Over a 100 Industry Experts available on demand, with live tutoring sessions & the opportunity to book 1:1 time.",
            image: features1
        },
        {
            title: "Interview Prep",
            description: "We guide you through Interview training and even provide Resume Critique",
            image: features2
        },
        {
            title: "Resource Based Learning",
            description:
                "The best resources are made available to you from published papers, video content and current trending topics, we ensure you receive a wholesome learning experience",
            image: features3
        },
        {
            title: "Lab Bypass",
            description:
                "Practice what you learn. A clean, sandbox environment to practice your labs, short term projects, get instant grading and further your learning experience",
            image: features4
        }
    ]

    // ** animation controls
    const rightToLeft = {
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
        <motion.section
            className="py-12 bg-white sm:py-16 lg:py-20"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={rightToLeft}
        >
            <div className=" mx-auto max-w-7xl sm:scale-99">
                <div className=" mx-auto text-center  lg:max-w-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Features</h2>
                    <p className="mt-4 text-lg text-gray-700 md:max-w-md md:mx-auto sm:mt-6 font-pj">
                        Our Unique Course and Service offerings enable you to get ahead instantly!
                    </p>
                </div>

                {/* <div className="flex gap-1 flex-wrap align-middle justify-center"> */}
                <Swiper
                    // slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper pb-5"
                    // Responsive breakpoints
                    breakpoints={{
                        // when window width is >= 0px
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 0
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 0
                        }
                    }}
                >
                    {features.map((feature, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="p-1 flex flex-col items-center max-sm:h-[580px]"
                                key={index}
                            >
                                <div>
                                    <div className="relative inline-flex  mt-10 group">
                                        <div
                                            className="absolute transitiona-all duration-1000 opacity-20 -inset-px  rounded-xl group-hover:opacity-35 group-hover:-inset-1 group-hover:duration-200 animate-tilt blur-2xl"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)"
                                            }}
                                        ></div>

                                        <img
                                            src={feature.image}
                                            alt="features"
                                            className="relative inline-flex !h-[290px] !w-[260px] object-fill !bg-no-repeat  items-center justify-center px-1 py-1 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="py-6  w-full  max-w-[250px] pb-[120px] max-h-[185px] overflow-hidden text-clip">
                                    <h1 className="font-bold text-xl mb-3">{feature.title}</h1>
                                    <p className=" line-clamp-4">{feature.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* </div> */}
            </div>
        </motion.section>
    )
}

export default Features
