import React from "react"

//imported images
import courseImage1 from "../../assets/images/corporate/corporateCourse1.png"
import courseImage2 from "../../assets/images/corporate/corporateCourse3.png"
import courseImage3 from "../../assets/images/corporate/corporateCourse4.png"
import courseImage4 from "../../assets/images/corporate/corporateCourse5.png"
import courseImage5 from "../../assets/images/corporate/corporateCourse6.png"
import courseImage6 from "../../assets/images/corporate/corporateCourse7.png"

//import third party
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const CorporateCourse = () => {
    const courses = [
        {
            id: 1,
            img: courseImage1,
            title: "Custom Training"
        },
        {
            id: 2,
            img: courseImage2,
            title: "AWS Training"
        },
        {
            id: 3,
            img: courseImage3,
            title: "Azure Training"
        },
        {
            id: 4,
            img: courseImage4,
            title: "Data Analytics"
        },
        {
            id: 5,
            img: courseImage5,
            title: "Cloud Security"
        }
        // {
        //     id: 6,
        //     img: courseImage6,
        //     title: "AWS"
        // }
    ]

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        laptop: {
            breakpoint: { max: 1024, min: 850 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 850, min: 550 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1
        }
    }

    return (
        <div>
            <h1 className="text-center text-2xl font-bold">Corporate Courses </h1>
            <p className="text-center text-sm mt-3 text-[#52525B]">Train every team at your company</p>

            <div className="mt-10">
                <Carousel
                    showDots
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    customTransition="all 2s"
                >
                    {courses.map((data) => {
                        return (
                            <div
                                key={data.id}
                                className="flex-grow-0 flex-shrink-0 mx-5 h-[171px] relative"
                            >
                                <img
                                    className=" w-full h-[146px] absolute left-[-0.97px] top-[-0.97px] rounded-lg"
                                    src={data.img}
                                    alt=""
                                />
                                <p className="absolute left-[18px] top-[98.9px] text-[25px] font-bold text-center text-white">
                                    {data.title}
                                </p>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default CorporateCourse
