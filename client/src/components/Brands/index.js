import React, { useEffect } from "react"

// ** import images

import amazonLogo from "../../assets/images/brands/Amazon_logo.svg"
import karatLogo from "../../assets/images/brands/karatLogo.svg"
// ** motion animation imports
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
const Brands = () => {
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
        }
    }, [controls, inView])
    return (
        <motion.section
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={rightToLeft}
            className="pt-10 bg-white mx-auto sm:pt-16 lg:pt-24"
        >
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-400">As seen on</h2>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-10 my-10">
                    <img
                        className="object-contain w-[110px]"
                        src={amazonLogo}
                        alt="amazon"
                    />
                    <img
                        className="object-contain w-[110px]"
                        src={karatLogo}
                        alt="brilliant black minds"
                    />
                </div>
            </div>
        </motion.section>
    )
}

export default Brands
