import React, { useEffect } from "react";
// ** custom iocons
import { ReactComponent as LineBar } from "../../assets/icons/line-bars.svg";

// ** thirdparty
import Backdrop from "@mui/material/Backdrop";
import AlertCard from "../../components/AlertCard";
import axios from "../../axios";

const Refer = () => {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const user = JSON.parse(localStorage.getItem("userInfo"));

	const fields = {
		title: "Unique Link Generated",
		subTitle:
			"We’ve created link for you so you can share it with your friends and family!",
		label: "Your Link",
		inputValue: "https://lakesidelearn.com?name=" + user[0].userName,
		btnText: "Copy",
	};

	const generateLink = async () => {
		const { data } = await axios.post("/user/update", {
			_id: user[0].id,
			referalCode: "https://lakesidelearn.com?name=" + user[0].userName,
		});
		console.log(data);
	};



	return (
		<>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={open}
			>
				<AlertCard {...fields} func={handleClose} />
			</Backdrop>
			<section className="pt-10 pb-1 sm:py-16 lg:py-20">
				<div className="mx-auto max-w-7xl">
					<div className="max-w-xl -my-5 ">
						<h2 className="text-lg font-bold text-gray-900 font-pj">
							Refer
						</h2>
						<p className="mt-6 text-base font-normal text-gray-600 font-pj">
							You can refer your friends
						</p>
					</div>

					<div className="flex flex-col items-center max-w-md mx-auto mt-8 lg:mt-20 lg:flex-row lg:max-w-none">
						<div className="relative flex-1 w-full h-full overflow-hidden bg-white border border-gray-200 rounded-2xl">
							<div className="py-8 px-9">
								<div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 rounded-xl font-pj">
									1
								</div>
								<p className="mt-5 text-xl font-medium text-gray-900 font-pj">
									Share your unique link with your friends,
									family, or contacts through social media or
									email.
								</p>
							</div>
						</div>

						<div className="block -my-1 lg:hidden">
							<LineBar />
						</div>

						<div className="hidden lg:block lg:-mx-2">
							<LineBar />
						</div>

						<div className="relative flex-1 w-full h-full ">
							<div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl">
								<div className="py-8 px-9">
									<div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 rounded-xl font-pj">
										2
									</div>
									<p className="mt-5 text-xl font-medium text-gray-900 font-pj">
										Your friends register on our website
										through your unique link, and complete a
										course.
									</p>
								</div>
							</div>
						</div>

						<div className="hidden lg:block lg:-mx-2">
							<LineBar />
						</div>

						<div className="block -my-1 lg:hidden">
							<LineBar />
						</div>

						<div className="relative flex-1 w-full h-full overflow-hidden bg-white border border-gray-200 rounded-2xl">
							<div className="py-8 px-9">
								<div className="inline-flex items-center justify-center w-10 h-10 text-base font-bold text-white bg-gray-900 rounded-xl font-pj">
									3
								</div>
								<p className="mt-5 text-xl font-medium text-gray-900 font-pj">
									You’re rewarded with a 50% discount on
									Courses and your friends get a 10% discount.
								</p>
							</div>
						</div>
					</div>
					<div className="max-w-7xl flex mt-10 w-full justify-end">
						<button
							type="button"
							className="active:scale-95 hover:scale-[1.02] inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
							onClick={() => {
								handleToggle();
								generateLink();
							}}
						>
							Generate Link
						</button>
					</div>
				</div>
			</section>
		</>
	);
};
export default Refer;
