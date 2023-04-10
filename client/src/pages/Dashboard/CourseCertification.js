import React, { useEffect } from "react";
import { ArrowLeft } from "react-feather";
import logo from "../../assets/logo/logo.svg";
import certificate from "../../assets/images/Certificate.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../axios";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const CourseCertification = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const courseName = searchParams.get("courseName");

  const DownloadImageOne = async () => {
    const fetch = await axios.get(`/download/courseCertificate`, {
      responseType: "blob",
    });
    let url = window.URL.createObjectURL(fetch.data);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Certificate.pdf";
    a.click();
  };

  useEffect(() => {
    const API = async () => {
      const { data } = await axios.post("/courseCertificate", {
        name,
        course: courseName,
        date: dayjs(Date.now()).format("DD/MM/YYYY"),
      });
      toast.success(data.msg);
    };
    API();
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full bg-[#FAFAFA] h-screen flex items-center flex-col">
        <div
          style={{ boxShadow: " 0px 1px 44px rgba(0, 0, 0, 0.1)" }}
          className="px-5 xs:px-10 md:px-20 w-[100%] py-6 flex mx-auto items-center !z-50 bg-white"
        >
          <ArrowLeft
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            size={20}
          />
          <p
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="cursor-pointer pl-5 text-[20px] font-[600] font-plus_jakarta_sans"
          >
            Certificate of completion
          </p>
        </div>
        <div
          style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.05)" }}
          className="!my-14 sm:mt-0 w-[95%] md:w-[750px] p-7 sm:h-[700px] md:h-[600px] bg-white !z-10"
        >
          <div className="w-full h-full border-[8px] border-[#000000] relative">
            <h2 className="font-plus_jakarta_sans text-[45px] font-bold table px-3 py-1 left-[-30px] bg-white absolute top-[-35px]">
              Course
            </h2>
            <div className="w-[90%] mx-auto flex justify-end py-8">
            <p>{ dayjs(Date.now()).format("DD/MM/YYYY")}</p>

            </div>
            <div className="w-full border-b-[6px] border-[#000000] pb-6">
              <div className="w-[90%] mx-auto">
                <p>This certificate is proudly presented to</p>
              </div>
            </div>
            <div className="w-full border-b-[6px] border-[#000000] pb-1.5">
              <div className="w-[90%] mx-auto">
                <h2 className="font-plus_jakarta_sans text-[35px] font-bold px-3 py-1 bg-white">
                  {name}
                </h2>
              </div>
            </div>
            <div className="w-full py-4 sm:py-6 px-4 sm:px-8 h-[63%] md:h-[59.5%] relative">
              <p className="text-[13px] sm:text-[15px]">
                For completing course
              </p>
              <h3 className="font-plus_jakarta_sans text-[20px] sm:text-[25px] font-[600] py-3">
                {courseName}
              </h3>
              <p className="text-[13px] sm:text-[15px]">
                We wish him/her a very successful journey!
              </p>
              <img
                src={certificate}
                className="sm:absolute sm:bottom-6 py-2 sm:py-0 sm:right-6 w-[130px] h-[130px]"
                alt=""
              />
              <img
                src={logo}
                className="sm:absolute sm:bottom-6 py-2 sm:py-0"
                alt=""
              />
            </div>
          </div>
        </div>
        <button
          onClick={DownloadImageOne}
          className="bg-[#000000] px-5 py-3 hover:scale-[1.1] text-white rounded-md transition duration-300"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CourseCertification;
