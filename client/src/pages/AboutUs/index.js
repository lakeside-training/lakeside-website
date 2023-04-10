/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

//  ** import components
import Brands from "../../components/Brands"
import RegisterCard from "../../components/RegisterCard"
import PageHeader from "../../components/PageHeader"

// ** import page content
import Team from "./Team"
import CoreValue from "./CoreValue"

// ** import images
import headerImg from "../../assets/images/about-us/page-header.png"
import missionImage from "../../assets/images/about-us/img-1.png"

// ** Motion Imports
import { motion } from "framer-motion"
const AboutUs = () => {
    const config = {
        title: "We take our impact and our team seriously That is how we have evolved",
        img: headerImg,
        subtitle: "On this page you will see what we aim Lakeside Learning to be"
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <PageHeader
                title={config.title}
                subtitle={config.subtitle}
                image={config.img}
            />

            <Brands />
            <div className="!mx-auto w-[95%]  sm:px-14  max-w-7xl">
                <section className="py-12 bg-white sm:py-16 lg:py-20">
                    {/* px-4  sm:px-6 lg:px-8 */}
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
                            <div className="text-center md:text-left lg:pr-16">
                                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                                    LakeSide Training Academy - A progressive Learning Platform
                                </h2>
                                <p className="my-4 text-base text-gray-700 sm:mt-8 font-pj">
                                    We aim to give minoritized and under-served populations an opportunity using the
                                    most powerful tool available - Upskilling. Learning can open doors to opportunities,
                                    jobs, experiences without you ever having to knock.
                                </p>

                                <p>
                                    Lake Side Learning started in XXXX and is an experienced and certified e-learning
                                    academy. We ensure our courses are tailored for all types of students and our Live
                                    sessions are interactive and informative as opposed to the traditional learning
                                    model. From Live Learning, to curated content for each course, you are guaranteed a
                                    value for money course that is on par with industry standards with every
                                    certification done through our platform.
                                </p>
                            </div>

                            <div className="h-[100%] max-h-[420px] w-auto relative group ">
                                <div className="relative group">
                                    <div
                                        className="absolute transitiona-all duration-1000 opacity-40 -inset-px rounded-xl blur-lg group-hover:opacity-60 group-hover:-inset-1 group-hover:duration-600 animate-tilt"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)",
                                            transform: "translate3d(0px, 25px, 0) scale(0.95)",
                                            filter: "blur(18px)",
                                            opacity: "var(0.7)"
                                        }}
                                    ></div>
                                    <img
                                        className="w-full relative border-2 rounded-xl border-[#E4E4E7] mx-auto"
                                        src={missionImage}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Team />
                <CoreValue />
            </div>
            <RegisterCard title={"Get Started on your next course with Lakeside Learning"} />
        </motion.div>
    )
}

export default AboutUs
