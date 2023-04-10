/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes as metaData } from "../router/routes";

const VerticalLayout = () => {
	// ** get location
	let location = useLocation(); // it's really important for get updated metaData

	// ** States
	const [meta, setMeta] = useState(null);

	const handleSetMeta = () => {
		const { meta } = metaData.filter((item) => {
			if (location.pathname === item.path) {
				return item.meta;
			}
		})[0];
		setMeta(meta);
	};

	//** ComponentDidMount
	useEffect(() => {
		handleSetMeta();
	}, [location]);
	return (
		<div>
			{(meta?.layout !== "blank" || meta?.layout === undefined) && meta && (
				<div>
					{meta?.isNotNavbar === true ? null : <Navbar />}
					{/* <div className="!mx-auto w-[95%]  max-w-7xl"> */}
					<Outlet />
					{/* </div> */}
					<div className="!mx-auto items-center w-[95%] max-w-7xl">
						{meta?.isNotFooter === true ? null : <Footer />}
					</div>
				</div>
			)}
		</div>
	);
};

export default VerticalLayout;
