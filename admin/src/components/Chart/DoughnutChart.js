import { ArcElement, Legend, Tooltip, Chart as ChartJS } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const data = {
		labels: ["Monthly", "Yearly"],

		datasets: [
			{
				label: "# of Votes",
				data: [80, 20],
				backgroundColor: ["rgba(54, 162, 235, 0.2)", "#008FFB"],

				borderWidth: 0,
			},
		],
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};

	const plugins = [
		{
			beforeDraw: function (chart) {
				const width = chart.width,
					height = chart.height,
					ctx = chart.ctx;
				ctx.restore();
				const fontSize = (height / 20).toFixed(2);
				ctx.font = fontSize + "px sans-serif";
				console.log(ctx.font);
				ctx.textBaseline = "middle";
				ctx.fillStyle = "#4F46E5";
				ctx.textBaseline = "top";
				const text = "",
					textX = Math.round(
						(width - ctx.measureText(text).width) / 2
					),
					textY = height / 2;
				ctx.fillText(text, textX, textY);
				ctx.save();
			},
		},
		{
			legend: {
				display: false,
			},
		},
	];
	const options1 = {
		responsive: true,
		cutout: 100,
		legend: {
			display: false,
			labels: {
				boxWidth: 0,
			},
		},
	};
	return (
		<div>
			<Doughnut
				data={data}
				options={options1}
				plugins={plugins}
				type="doughnut"
				width={100}
			/>
		</div>
	);
};

export default DoughnutChart;
