import React, { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";

const BarChart = ({ title }) => {
	const [inComeData, setInComeData] = useState({});

	console.log(inComeData);
	const chartData = {
		series: [			
			{
				name: inComeData?.name,
				data: inComeData?.data,
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
				toolbar: {
					show: false,
				},
			},
			legend: {
				position: "bottom",
				markers: {
					radius: 12,
					offsetX: -14,
				},
				itemMargin: {
					horizontal: 12,
					vertical: 20,
				},
				offsetX: -350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "32%",
					endingShape: "rounded",
					borderRadius: 3,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 4,
				colors: ["transparent"],
			},
			colors: ["#4F46E5", "#E4E4E7"],
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
			yaxis: {},
			fill: {
				opacity: 1,
			},
			tooltip: {
				shared: true,
				intersect: false,
				y: {
					formatter: function (val) {
						return "$ " + val + " thousands";
					},
				},
			},
		},
	};

	// Date range default value is 1 Day
	const [startDate, setStartDate] = useState(
		new Date() - 1000 * 60 * 60 * 24
	);
	const [endDate, setEndDate] = useState(new Date());
	const onChangeDate = (dates) => {
		console.log("%c dates ", "font-size: 30px; color: red;", dates);
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	// Fetch data from API
	useEffect(() => {
		const fetchData = async () => {
			// date Thu Nov 17 2022 12:54:58 GMT+0600 (Bangladesh Standard Time) -> Thu, 17 Nov 2022 12:54:58 GMT
			const start = new Date(startDate).getTime();
			const end = new Date(endDate).getTime();

			const {
				data: { data },
			} = await axios.post("dashboard/income/bar", {
				startDate: start,
				endDate: end || new Date().getTime(),
			});
			console.log(data)
			setInComeData({
				
					name: data[0].name,
					data: data[0].value,
				
				
			});
		};
		endDate && fetchData();
	}, [startDate, endDate]);
	// Custom Date Picker Input Component
	const CustomInputDatePicker = ({ value, onClick }) => (
		<button
			type="button"
			className="inline-flex items-center w-full px-3 py-2 text-sm font-medium leading-4 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
			onClick={onClick}
		>
			<svg
				className="w-5 h-5 mr-2 -ml-1 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			{value.split(" - ")[1].length ? value : "Select Date"}
		</button>
	);

	return (
		<div className="w-full">
			<div className="w-full">
				<div className="px-2 mx-auto sm:px-4 lg:px-2 w-full">
					<div className="mx-auto">
						<div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg">
							<div className="px-4 py-5 sm:p-6">
								<div className="sm:flex sm:items-center sm:justify-between">
									<p className="text-base font-bold text-gray-900">
										{title}
									</p>
									<div className="mt-4 sm:mt-0">
										<DatePicker
											selected={startDate}
											onChange={onChangeDate}
											startDate={startDate}
											endDate={endDate}
											selectsRange
											// change date format -> feb 1 - feb 10
											dateFormat="MMM d"
											// custom input
											customInput={
												<CustomInputDatePicker />
											}
											maxDate={new Date()}
										/>
									</div>
								</div>

								<ReactApexChart
									series={chartData.series}
									options={chartData.options}
									type="bar"
									height={350}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BarChart;
