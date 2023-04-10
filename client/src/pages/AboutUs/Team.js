import React from "react"

//  ** import images
import zayad from "../../assets/images/about-us/member-1.png"
import isioma from "../../assets/images/about-us/member-2.png"
import jide from "../../assets/images/about-us/member-3.png"

const Team = () => {
    const teamMembers = [
        {
            name: "ZAYYAD",
            designation: "Co founder, Software Engineer",
            image: zayad
        },
        {
            name: "ISIOMA",
            designation: "Co founder, Data Scientist",
            image: isioma
        },
        {
            name: "JIDE",
            designation: "Co founder, Consultant",
            image: jide
        },
        {
            name: "Toks",
            designation: "Co founder, Software Engineer",
            image: zayad
        }
    ]
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                        Our Leadership Team
                    </h2>
                    <p className="mt-5 text-lg font-normal text-gray-600 font-pj">People who made us successful</p>
                </div>

                <div className="grid grid-cols-1 px-12 mx-auto mt-12 lg:max-w-4xl xl:max-w-5xl sm:px-0 sm:mt-16 sm:grid-cols-4 sm:gap-x-16 gap-y-12 ">
                    {teamMembers.map((member, index) => (
                        <div key={`member-${index}`}>
                            <div className="relative group cursor-pointer">
                                <div className="absolute  transition-all duration-1000 opacity-30 -inset-px group-hover:bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                                <img
                                    className="object-cover relative z-20 w-full h-60 lg:h-80 bg-[#CCCCCC] rounded-xl"
                                    src={member.image}
                                    alt=""
                                />
                            </div>
                            <p className="mt-5 text-lg font-bold text-gray-900 sm:mt-10 font-pj">{member.name}</p>
                            <p className="mt-2 text-base font-normal text-gray-600 font-pj">{member.designation}</p>
                        </div>
                    ))}

                    {/* <div>
						<div className="relative">
							<div className="absolute transitiona-all duration-1000 opacity-30 -inset-px bg-gradient-to-r rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
							<img
								className="object-cover relative z-20 w-full h-60 lg:h-80 rounded-xl bg-[#CCCCCC]"
								src={member2}
								alt=""
							/>
						</div>
						<p className="mt-5 text-lg font-bold text-gray-900 sm:mt-10 font-pj">
							ISIOMA
						</p>
						<p className="mt-2 text-base font-normal text-gray-600 font-pj">
							Co founder, Data Scientist
						</p>
					</div>

					<div>
						<div className="relative">
							<div className="absolute transitiona-all duration-1000 opacity-30 -inset-px bg-gradient-to-r rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
							<img
								className="object-cover relative z-20 w-full h-60 lg:h-80 bg-[#CCCCCC] rounded-xl"
								src={member3}
								alt=""
							/>
						</div>
						<p className="mt-5 text-lg font-bold text-gray-900 sm:mt-10 font-pj">
							JIDE
						</p>
						<p className="mt-2 text-base font-normal text-gray-600 font-pj">
							Co founder, Consultant
						</p>
					</div> */}
                </div>
            </div>
        </section>
    )
}

export default Team
