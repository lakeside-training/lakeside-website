import React, { useEffect } from "react";
// ** thirdparty
import { X, Mail } from "react-feather";
import axios from "../../axios";
// ** import custom function

const AlertCard = ({ title, subTitle, inputValue, lable, btnText, func }) => {
	const [authUrl, setAuthUrl] = React.useState("");
	useEffect(() => {
		(async () => {
			const { data } = await axios.get("/get-auth-url");
			console.log(data);
			setAuthUrl(data.authUrl);
		})();
	}, []);
	return (
		<div className=" relative bg-white h-auto px-5 py-8 rounded-lg w-[90%] sm:min-w-[100px] max-w-fit">
			<div
				className="p-2 bg-red-400 text-white absolute -right-2 -top-2 rounded-full cursor-pointer hover:bg-red-500 duration-300 hover:scale-105"
				onClick={func}
			>
				<X size={20} />
			</div>

			{title && (
				<div className="max-w-xl px-8 mb-5  md:px-0">
					<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl xl:text-4xl font-pj">
						{title ?? title}
					</h2>
					<p className="mt-6 text-lg font-normal text-gray-600 font-pj">
						{subTitle ?? subTitle}
					</p>
				</div>
			)}
			{inputValue && (
				<div>
					<label className="sr-only">{lable ?? lable}</label>
					<div className="relative">
						<input
							type="text"
							name=""
							placeholder="link"
							className="block w-full py-4 pl-12 pr-4  mb-5 overflow-hidden text-base font-normal text-gray-900 placeholder-gray-600 transition-all duration-200 border border-gray-300 caret-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-gray-900 font-pj"
							value={inputValue}
						/>
					</div>
				</div>
			)}
			<h3>Or</h3>
			<a href={authUrl}>
				<div className="text-slate-900 flex justify-center items-center cursor-pointer">
					<div>
						<h3>Use Gmail to send Invite</h3>
					</div>
					<div className="ml-2">
						<div className="p-2 border-2 rounded border-[#64748B]">
							<Mail size={20} />
						</div>
					</div>
				</div>
			</a>
		</div>
	);
};

export default AlertCard;
