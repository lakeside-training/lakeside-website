import React, { useEffect } from "react"

// ** import images and svg icons
import avatar1 from "../../assets/images/Testimonial/avatar-1.png"
import avatar2 from "../../assets/images/Testimonial/avatar-2.png"
import avatar3 from "../../assets/images/Testimonial/avatar-3.png"
import manImg from "../../assets/images/Testimonial/man.png"
// import manImageWithOutBg from "../../assets/images/Testimonial/man-1 1.png"
// ** motion animation imports
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
const Testimonial = () => {
    const testimonials = [
        {
            name: "Ousmane",
            designation: "AWS Masterclass",
            avatar: avatar1,
            review: "“I am having a wonderful experience with Lakeside Training Academy which has helped me to expand my skills in cloud”"
        },
        {
            name: "Eniola",
            designation: "Cloud Security",
            avatar: avatar2,
            review: "“Great course! It gave me a solid foundation in understanding cloud computing and its applications. Very interesting and informative.”"
        },
        {
            name: "Funbi",
            designation: "AWS Masterclass",
            avatar: avatar3,
            review: "“My experience has been great thus far. A good balance of theory and hands-on learning with assignments to solidify the knowledge gained.”"
        }
    ]

    // ** animation controls
    const leftToRight = {
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
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={leftToRight}
        >
            <section className="">
                <div className="relative">
                    <div className="flex flex-col">
                        <div className="py-3 lg:pt-0 lg:pb-10  lg:w-1/2 ">
                            <blockquote className="text-center  block lg:hidden lg:text-left">
                                <p className="text-base w-[80%]  ms:w-[60%] mx-auto sm:text-xl md:text-3xl font-sansSerif font-normal leading-relaxed text-gray-900 font-pj">
                                    “I just finished my Cloud Practitioner exam and am excited to say I passed it! I
                                    want to thank you for your help. Your help made me more confident and ready for the
                                    exam. I am truly grateful.”
                                </p>
                            </blockquote>
                        </div>
                        <div className="block pt-5 lg:hidden">
                            <img
                                className="w-[80%] xs:w-[50%] block max-w-lg mx-auto"
                                src={manImg}
                                alt=""
                            />
                        </div>

                        <div className="py-8 !pt-0 bg-gray-700 lg:order-2 sm:py-12">
                            <div className="px-4  sm:px-14 mx-auto max-w-7xl ">
                                <div className="flex flex-col items-center sm:justify-center sm:flex-row lg:justify-start">
                                    <div className="mt-5  sm:mt-0">
                                        <p className="text-xl font-bold text-white font-pj">Cameron Williamson</p>
                                        <p className="text-sm font-normal font-pj text-white mt-1.5">
                                            Director of Technology, CreativeGIG
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* gradient line bar */}
                            <div className="relative -bottom-8 sm:-bottom-12 z-20 ">
                                <div
                                    className="w-full h-[6px] "
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)"
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="grid place-items-center mb-10 lg:mb-52 mt-10">
                                <div className="flex justify-center text-center flex-col">
                                    <h1 className="text-2xl sm:text-3xl  md:text-4xl font-bold text-[#18181B] font-pj mb-2 px-2">
                                        Professionals speak about Lake Side Learning
                                    </h1>
                                    {/* rating */}
                                    <div className="flex items-center flex-wrap  justify-center ">
                                        <>
                                            <svg
                                                aria-hidden="true"
                                                className="w-6 h-6 text-[#F59E0B]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>First star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg
                                                aria-hidden="true"
                                                className="w-6 h-6 text-[#F59E0B]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>Second star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg
                                                aria-hidden="true"
                                                className="w-6 h-6 text-[#F59E0B]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>Third star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg
                                                aria-hidden="true"
                                                className="w-6 h-6 text-[#F59E0B]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>Fourth star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <svg
                                                aria-hidden="true"
                                                className="w-6 h-6 text-[#F59E0B]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <title>Fourth star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </>
                                        <p className="ml-2 text-md font-medium text-black ">
                                            <strong>4.7 out of 5 stars</strong> from 2.8k reviews
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4  sm:px-14 mx-auto max-w-7xl ">
                            <div className="flex items-end lg:order-1">
                                <div className="py-5 lg:pt-0 hidden lg:block lg:pb-10 lg:w-1/2">
                                    <blockquote className="text-center lg:text-left">
                                        <p className="sm:text-xl md:text-3xl font-sansSerif font-normal leading-relaxed text-gray-900 font-pj">
                                            “I just finished my Cloud Practitioner exam and am excited to say I passed
                                            it! I want to thank you for your help. Your help made me more confident and
                                            ready for the exam. I am truly grateful.”
                                        </p>
                                    </blockquote>
                                </div>

                                <div className="absolute bottom-0 right-0 hidden w-1/2 lg:block">
                                    <img
                                        className="w-full max-w-lg ml-10 mr-auto"
                                        src={manImg}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-3  bg-white sm:py-10">
                <div className="px-4 mx-auto max-w-7xl  sm:px-14  ">
                    <div className="grid max-w-xl grid-cols-1 gap-10  mx-auto md:max-w-7xl md:grid-cols-3 md:gap-x-3">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="z-20"
                            >
                                <blockquote className="py-6 bg-gray-100 rounded-2xl px-7">
                                    <p className="text-lg font-normal leading-relaxed text-gray-900 font-pj">
                                        {testimonial.review}
                                    </p>
                                </blockquote>
                                <div className="flex items-center mt-5">
                                    <img
                                        className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                                        src={testimonial.avatar}
                                        alt=""
                                    />
                                    <div className="ml-2">
                                        <p className="text-base font-bold text-gray-900 font-pj">{testimonial.name}</p>
                                        <p className="mt-0.5 font-pj text-sm text-gray-600">
                                            {testimonial.designation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Testimonial
