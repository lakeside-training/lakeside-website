import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "../../axios";
const DonutChart = ({ title, endPoint }) => {
  // ** Income -> Monthly | One Time
  const [incomeDateRange, setIncomeDateRange] = useState({
    value: 7,
    label: "Last 7 days",
  });
  const [chartUserData, setChartUserData] = useState([]);
  const [loading, setLoading] = useState(false);
console.log(chartUserData.map((i) => i.value));
  const chartDataObj = {
    series: chartUserData.map((i) => i.value),
    options: {
      labels: chartUserData.map((i) => i.label),
      legend: {
        position: "bottom",
        markers: {
          radius: 12,
          offsetX: -4,
          fillColors: ["#4F46E5", "#E0E7FF"],
        },
        offsetX: -180,
        itemMargin: {
          // horizontal: 12,
          // vertical: 20,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#4F46E5", "#E0E7FF"],
        },
      },
      chart: {
        type: "donut",
      },
      fill: {
        colors: ["#4F46E5", "#E0E7FF"],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Poppins",
                color: "#4F46E5",
                formatter: (val) => {
                  return val;
                },
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "bold",
                label: "$",
                color: "#4F46E5",
                offsetY: 0,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#373d3f",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    },
  };

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropDownData = [
    {
      value: 7,
      label: "Last 7 days",
    },
    {
      value: 30,
      label: "Last 30 days",
    },
    {
      value: 365,
      label: "Last 365 days",
    },
  ];

  useEffect(() => {
    const fetchIncome = async () => {
      setLoading(true);
      if(title === 'User Registration') {
        const {
          data: { data },
        } = await axios.get(`${endPoint}/${incomeDateRange.value}`);

        console.log(data.length);
  
        setChartUserData([
          {
            label: "Register User",
            value: data.length,
          },
          { label: "Target", value: 0 },
        ]);
  
        setLoading(false);

      } else {
        const {
          data: { data },
        } = await axios.get(`${endPoint}/${incomeDateRange.value}`);
  
        setChartUserData([
          {
            label: "Income",
            value: data,
          },
          { label: "Remaining", value: 0 },
        ]);
  
        setLoading(false);
      }
      
    };
    fetchIncome();
  }, [incomeDateRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen !min-w-full">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full mx-auto flex flex-col items-center justify-center">
      <div className="px-2 mx-auto w-full min-h-full">
        <div className="mx-auto min-h-full">
          <div
            style={{ minHeight: "450px", maxHeight: "450px" }}
            className={`${
              title == "User Registration"
                ? "!min-h-full ms:!min-h-[470px] !max-h-full ms:ms!max-h-[470px] 2xl:!min-h-[450px] 2xl:!max-h-[450px]"
                : "!min-h-full ms:!min-h-[450px] !max-h-full ms:!max-h-[450px]"
            }  !h-full overflow-hidden bg-white shadow-lg rounded-xl`}
          >
            <div className="px-4 py-5 sm:p-6 !min-w-full">
              <div className="flex sitems-center items-center justify-between w-[100%] mx-auto">
                <p className="mt-4 ms:mt-0 text-base font-bold text-gray-900">
                  {title}
                </p>
                {/* Drop Down Section Start */}
                <div
                  className="mt-4 sm:mt-0 relative"
                  onClick={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center w-full px-3 py-2 text-sm font-medium leading-4 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2 -ml-1 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {incomeDateRange.label}
                  </button>
                  {/* list of time 7D | 1M | 1Y */}
                  <div
                    className={`border rounded mt-2 absolute w-[100%] bg-white overflow-hidden transition-all ease-in-out shadow-lg focus:ring-indigo-600 z-10 ${
                      !openDropdown ? "hidden h-0" : "block h-auto"
                    }`}
                  >
                    {dropDownData.map((time, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setOpenDropdown(false);
                          setIncomeDateRange(time);
                        }}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {time.label}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Drop Down Section End */}
              </div>
              <div className="mt-5 flex flex-col items-center justify-center">
                <ReactApexChart
                  type="donut"
                  series={chartDataObj.series}
                  options={chartDataObj.options}
                  height={380}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
