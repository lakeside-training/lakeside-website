/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// ** motion animation imports
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "./Card";
import axios from '../../../axios'
const Pricing = () => {

	const [planDetails, setPlanDetails] = useState([])

	const Plan = "Premium";

	// ** style for pricing card section
	const selectedStyle = `inline-flex items-center justify-center px-8 py-3.5 w-full mt-8 text-base font-bold text-gray-900 bg-white transition-all duration-200 border-2 border-transparent focus:ring-offset-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-opacity-90`;
	// const unselectedStyle = `inline-flex items-center justify-center px-8 py-3.5 w-full mt-8 text-base font-bold text-gray-900 transition-all duration-200 border-2 border-gray-400 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:text-white focus:text-white hover:border-gray-900 focus:border-gray-900`

	// const isSelect = (selectedPlan) =>
	//   selectedPlan === Plan ? seletedtStyle : unselectedStyle
	// const isSelectBg = (selectedPlan) =>
	//   selectedPlan === Plan
	//     ? " bg-gray-900 border border-gray-200 rounded-2xl text-white"
	//     : " bg-white border border-gray-200 rounded-2xl"

	const BgColor = () => (
		<div className="absolute -inset-4">
			<div
				className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
				style={{
					background:
						"linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
				}}
			></div>
		</div>
	);


	useEffect(() => {
		const API = async () => {
		  const { data } = await axios.get("/plan/all");
		  setPlanDetails(data.data);
		};
		API();
	  }, []);
	

	// ** animation controls
	const rightToLeft = {
		hidden: { y: 100, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				delay: 0.2,
				duration: 1,
			},
		},
	};
	const controls = useAnimation();
	const [ref, inView] = useInView();
	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<motion.section
			className="py-12 bg-white sm:py-16 lg:py-20"
			ref={ref}
			animate={controls}
			initial="hidden"
			variants={rightToLeft}
		>
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				{/* Title */}
				<div className=" max-w-7xl px-8 mx-auto text-center md:px-0">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
						Two affordable packages for you
					</h2>
					<p className="mt-6 text-lg font-normal text-gray-600 font-pj">
						Choose whatever you like!
					</p>
				</div>

				<div className="flex">
					<Card
						data={planDetails}
					/>
					
				</div>
			</div>
		</motion.section>
	);
};
export default Pricing;
