import React from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "../../axios";

const AreaChart = ({ title }) => {
  const timeList = [
    {
      label: "7 Days",
      startDate: new Date() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      endDate: new Date().getTime(),
    },
    {
      label: "30 Days",
      startDate: new Date() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      endDate: new Date().getTime(),
    },
    {
      label: "6 Months",
      startDate: new Date() - 6 * 30 * 24 * 60 * 60 * 1000, // 6 months ago
      endDate: new Date().getTime(),
    },
    {
      label: "1 Year",
      startDate: new Date() - 12 * 30 * 24 * 60 * 60 * 1000, // 1 year ago
      endDate: new Date().getTime(), // now
    },
  ];
  // its store index of timeList
  const [selectedTime, setSelectedTime] = React.useState(0);

  // Fetch data from API based on selectedTime
  const [data, setData] = React.useState({
    name: "One Time",
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data },
      } = await axios.post("/dashboard/user-registration/bar", {
        startDate: timeList[selectedTime].startDate,
        endDate: timeList[selectedTime].endDate,
      });
      console.log("%c data bar ", "font-size: 30px; color: red;", data);
      setData({
        name: data[0].name,
        data: data[0].value,
      });
    };

    fetchData();
  }, [selectedTime]);

  const chartData = {
    series: [
      {
        name: data.name,
        data: data.data,
      },
      
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
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
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        row: {
          opacity: 0,
        },
      },
      fill: {
        type: "solid",
        opacity: [0.05, 0],
      },
      colors: ["#4F46E5", "#818CF8"],
      legend: {
        show: false,
        position: "bottom",
        markers: {
          radius: 12,
          offsetX: -4,
        },
        itemMargin: {
          horizontal: 12,
          vertical: 20,
        },
      },
    },
  };

  return (
    <div>
      <div className="px-2 ">
        <div className="border rounded-lg px-2 w-full h-full mx-auto bg-white shadow-lg min-h-[450px]">
          <div className="flex flex-wrap items-center justify-between pt-5 bg-white px-2">
            <p className="text-base font-bold text-gray-900 lg:order-1">
              {title}
            </p>

            {/* <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm lg:order-2 2xl:order-3 md:order-last hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="w-4 h-4 mr-1 -ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export to CSV
            </button> */}

            <nav className="flex items-center justify-center mt-4 space-x-1 2xl:order-2 lg:order-3 md:mt-0 lg:mt-4 sm:space-x-2 2xl:mt-0">
              {timeList.map((item, index) => (
                <button
                  className={`px-2 py-2 text-xs font-bold text-gray-500 transition-all border  rounded-lg sm:px-4  duration-200
									${
                    selectedTime === index
                      ? "bg-indigo-1 text-gray-50"
                      : "hover:bg-gray-100 hover:text-indigo-1"
                  }
									`}
                  onClick={() => setSelectedTime(index)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="">
            <ReactApexChart
              series={chartData.series}
              options={chartData.options}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
