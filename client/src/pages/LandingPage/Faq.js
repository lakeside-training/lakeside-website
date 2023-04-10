import React, { useState } from "react"

import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react"

const Faq = () => {
    const [open, setOpen] = useState(1)

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value)
    }

    // custom styles for animation
    const customAnimation = {
        mount: { scale: 1 },
        unmount: { scale: 0.9 }
    }

    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    <div className="relative inline-flex mt-10 group">
                        <div className="absolute transitiona-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#44beff27] via-[#ff44ec1f] to-[#ff665e21] rounded-xl blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Accordion
                                open={open === 1}
                                className="relative transition-all bg-white duration-200  rounded-lg"
                                animate={customAnimation}
                            >
                                <AccordionHeader
                                    className="flex px-5 text-left text-base sm:text-lg font-semibold text-black"
                                    onClick={() => handleOpen(1)}
                                >
                                    How do I get started on Learning?{" "}
                                </AccordionHeader>
                                <AccordionBody className="px-4 pb-5 sm:px-6 sm:pb-6 font-semibold">
                                    Choose a relevant course to you or your career path and sign up. Once you do you
                                    will be given a questionnaire, to understand your aim of learning and then you will
                                    be granted access to multiple hand picked resources and quizzes.
                                </AccordionBody>
                            </Accordion>
                        </div>
                    </div>
                    <div className="relative inline-flex mt-10 group">
                        <div className="absolute transitiona-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#44beff27] via-[#ff44ec1f] to-[#ff665e21] rounded-xl blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Accordion
                                open={open === 2}
                                className="relative transition-all bg-white duration-200  rounded-lg"
                                animate={customAnimation}
                            >
                                <AccordionHeader
                                    className="flex px-5 text-left text-base sm:text-lg font-semibold text-black"
                                    onClick={() => handleOpen(2)}
                                >
                                    How long do you provide support?
                                </AccordionHeader>
                                <AccordionBody className="px-4 pb-5 sm:px-6 sm:pb-6 font-semibold">
                                    Our support extends from the time you start our courses to the time you complete it
                                    and even after with our career workshops, so you can place a good job or enhance
                                    your career path.
                                </AccordionBody>
                            </Accordion>
                        </div>
                    </div>
                    <div className="relative inline-flex mt-10 group">
                        <div className="absolute transitiona-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#44beff27] via-[#ff44ec1f] to-[#ff665e21] rounded-xl blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Accordion
                                open={open === 3}
                                className="relative transition-all bg-white duration-200  rounded-lg "
                                animate={customAnimation}
                            >
                                <AccordionHeader
                                    className="flex px-5 text-left text-base sm:text-lg font-semibold text-black"
                                    onClick={() => handleOpen(3)}
                                >
                                    Do I need any work experience to start learning?
                                </AccordionHeader>
                                <AccordionBody className="px-4 pb-5 sm:px-6 sm:pb-6 font-plus_jakarta_sans">
                                    <p className="font-plus_jakarta_sans font-semibold">
                                        Not at all, you can be a completely new learner and still be guided by our
                                        industry experts in obtaining the knowledge you require.
                                    </p>
                                </AccordionBody>
                            </Accordion>
                        </div>
                    </div>
                    <div className="relative inline-flex lg:w-[770px] mt-10 group">
                        <div className="absolute transitiona-all duration-1000 opacity-20 -inset-px bg-gradient-to-r from-[#44beff27] via-[#ff44ec1f] to-[#ff665e21] rounded-xl blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <div className="transition-all w-full duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Accordion
                                open={open === 4}
                                className="relative transition-all bg-white duration-200  rounded-lg"
                                animate={customAnimation}
                            >
                                <AccordionHeader
                                    className="flex px-5 text-left text-base sm:text-lg font-semibold text-black"
                                    onClick={() => handleOpen(4)}
                                >
                                    Will I get certificate?
                                </AccordionHeader>
                                <AccordionBody className="px-4 pb-5 sm:px-6 sm:pb-6 font-semibold">
                                    Yes, a downloadable certificate will be emailed to you at the end of the course.
                                </AccordionBody>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq
