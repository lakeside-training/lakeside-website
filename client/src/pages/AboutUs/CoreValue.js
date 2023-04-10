import React from "react"

// ** import svg icons
import qualityIco from "../../assets/icons/folder-favorite.svg"
import productIco from "../../assets/icons/archive-content.svg"
import onboardingIco from "../../assets/icons/board.svg"
import resultIco from "../../assets/icons/ring-chart.svg"
import salesIco from "../../assets/icons/chart-bar.svg"
import SupportIco from "../../assets/icons/headphones.svg"

const CoreValue = () => {
    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            {/* px-4 sm:px-6 lg:px-8 */}
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                        Our Core Features
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
                        Lorem ipsum dolor sit amet, consectetur adipis elit
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
                    <div className="md:p-8 lg:p-14">
                        <img
                            src={qualityIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Interactive Platform</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            Lake Side Learning offers a Multimedia approach to learning. Our Teachers take a
                            multi-disciplinary approach to learning, often combining learning methods. You will learn
                            theory and the practical approach for each subject ensuring you try and test all what you
                            have learnt.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
                        <img
                            src={productIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Live Flexible Teaching</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            Lecturers provide Live 1:1 Sessions, where dates can be selected, questions can be asked
                            during the session making the experience more valuable and personal than watching a
                            pre-recorded lesson.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
                        <img
                            src={onboardingIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Diverse Staff</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            Our Teachers have each walked their own path to where they are now and are industry experts.
                            They bring years of experience to the table and are from minorities themselves. This ensures
                            that the best industry standards are adhered to while the content is kept relatable.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
                        <img
                            src={resultIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Resource Based Learning</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            Lake Side Learning gathers the best available resources and brings them together. From
                            original content to freely available resources off YouTube and online, we put together the
                            most beneficial lesson plan for each of our students and even give you a space to save your
                            best resources for future use.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
                        <img
                            src={salesIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Career Workshop</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            A good path might never be well planned, but it can be thought about. We help you create
                            your path, and identify your goals and show you how you can reach them with simple
                            solutions. Our workshop is guaranteed to point you in the right direction
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
                        <img
                            src={SupportIco}
                            className="mx-auto"
                            width="46"
                            height="46"
                            alt="quality"
                        />
                        <h3 className="mt-12 text-xl font-bold text-gray-900 font-pj">Interview Prep</h3>
                        <p className="mt-5 text-base text-gray-600 font-pj">
                            We help you gear up for your interview with the right attitude, and right answers. From
                            simple things like offering resume services and resume revision, to polishing of soft skills
                            and even how you enter the room, we guide you through it all step by step.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CoreValue
