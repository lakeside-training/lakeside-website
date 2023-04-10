import React from "react";
import AreaChart from "../../components/Chart/AreaChart";
import BarChart from "../../components/Chart/BarChart";
import DonutChart from "../../components/Chart/DonutChart";

const Dashboard = () => {
  return (
    <div className="bg-[#F4F4F5] min-h-[100vh] w-full dashboard">
      <div className="transition-all duration-200 transform group-hover:translate-x-1 flex absolute top-[10px] lg:top-[auto] left-[60px] lg:left-[auto] lg:sticky">
        <h1 className="text-gray-900 justify-between cursor-pointer lg:text-4xl font-bold font-pj duration-300 mb-4 ">
          Dashboard
        </h1>
      </div>
      <div className="w-full mt-[40px] h-full">
        <div className="flex flex-wrap w-[100%] justify-between min-h-full items-center">
          <div className="min-h-full lg:!min-h-[485px] w-[95%] ms:w-[89%] lg:w-[40%] md:w-[60%] mx-auto flex items-center">
            <DonutChart title={"Income"} endPoint={"/dashboard/income/donut"} />
          </div>
          <div className="w-[95%] ms:w-[91%] md:w-[62%] lg:w-[60%] mx-auto lg:mt-0 mt-[17px]">
            <BarChart title="Income" />
          </div>
        </div>
        <div className="flex flex-wrap w-[100%] justify-between min-h-full items-center">
          <div className="w-[95%] ms:w-[90%] lg:w-[40%] md:w-[60%] min-h-full mx-auto lg:mt-0 mt-[17px]">
            <DonutChart
              title={"User Registration"}
              endPoint={"/dashboard/user-registration/donut"}
            />
          </div>
          <div className="w-[95%] ms:w-[90%] md:w-[60%] lg:w-[60%] mx-auto min-h-[450px] lg:mt-0 mt-[17px]">
            <AreaChart title="User Registration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
