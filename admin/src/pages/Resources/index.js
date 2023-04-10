import React from "react";
import { useState } from "react";
import { MoreVertical, Search, Upload } from "react-feather";
import image from "../../assets/resourse/image.svg";
import doc from "../../assets/resourse/doc.svg";
import audio from "../../assets/resourse/audio.svg";
import video from "../../assets/resourse/video.svg";
import link from "../../assets/resourse/link.svg";

import image1 from "../../assets/resourse/image1.svg";
import doc1 from "../../assets/resourse/doc1.svg";
import audio1 from "../../assets/resourse/audio1.svg";
import video1 from "../../assets/resourse/video1.svg";
import link1 from "../../assets/resourse/link1.svg";

//images
import courseImg from "../../assets/images/awscourses.png";
import Modals from "../../components/Modal/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { trackPromise } from "react-promise-tracker";

import axios from "../../axios";
import { toTitleCase } from "../../utils";
import Spinner from "../../components/spinner/Spinner";

const Resources = () => {
  const userToken = localStorage.getItem("userToken");

  //states
  const [settingStatus, setSettingStatus] = useState(false);
  //modal status
  const [modalStatus, setModalStatus] = useState(false);
  //modal type
  const [modalType, setModalType] = useState("");

  // all resources
  const [allResources, setAllResources] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("image");

  console.log(selectedValue);

  //copoy text
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchAllResources = async () => {
    try {
      const { data } = await axios.get("/resources/get-all", {
        headers: { authorization: userToken },
      });
      let datas = data.data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      console.log(datas);
      const filter = datas.filter((i) => i.category === selectedValue);

      setAllResources(filter);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trackPromise(fetchAllResources());
  }, [selectedValue]);

  useEffect(() => {
    if (copySuccess) {
      toast.success("copped successfully");
    }
  }, [copySuccess]);

  const modalClose = () => {
    setModalStatus(false);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/resources/delete/${id}`, {
        headers: { authorization: userToken },
      });
      if (data.success) {
        toast.success(data.message);
        fetchAllResources();
        return;
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // handle search
  const handleSearch = async (val) => {
    try {
      const { data } = await axios.post(`/resources/search/${val}`, {
        headers: { authorization: userToken },
      });
      console.log("data", data);
      setAllResources(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      handleSearch(search);
    } else {
      fetchAllResources();
    }
  }, [search]);

  return (
    <div className="min-h-[100vh]">
      <div className="w-full lg:justify-between lg:flex z-10">
        <div className="absolute top-[10px] lg:top-[auto] left-[60px] lg:left-[auto] lg:sticky">
          <p className="lg:text-2xl font-bold mb-3">Resources</p>
        </div>
        <div className="flex justify-between mt-[40px] lg:mt-0">
          <div className="relative lg:mr-8">
            <input
              type="text"
              name="name"
              id=""
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="lg:flex border pl-8 lg:pl-12 lg:w-[350px] w-[210px] sm:w-[250px]  py-3 lg:text-md  border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600 "
            />
            <div className="absolute lg:top-4 top-4 lg:left-4 left-2">
              <Search size={20} className="text-[#868686]" />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setModalStatus(!modalStatus);
                setModalType("addResource");
              }}
              className="flex items-center py-[9px] px-5 bg-[#4F46E5] text-white rounded-lg transition duration-300 border-4 border-[#4F46E5] hover:text-[#4F46E5] hover:bg-white "
            >
              <Upload className="hidden sm:block" size={20} />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white block sm:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="hidden sm:block lg:block ml-2 text-[16px]">
                Add Resources
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-4 ml-4">
        <div
          onClick={() => setSelectedValue("image")}
          className="flex items-center justify-center cursor-pointer mx-4 relative"
        >
          {selectedValue === "image" && (
            <div className=" absolute border-b-4 border-blue-500 border-solid -bottom-3 left-3 w-[90%]"></div>
          )}
          <img
            src={selectedValue === "image" ? image1 : image}
            alt="img"
            className="w-6 h-6 mx-3"
          />
          <p className={selectedValue === "image" ? "text-blue-500" : "#000"}>
            Image
          </p>
        </div>
        <div
          onClick={() => setSelectedValue("audio")}
          className="flex items-center cursor-pointer mx-4 relative"
        >
          {selectedValue === "audio" && (
            <div className=" absolute border-b-4 border-blue-500 border-solid -bottom-3 left-3 w-[90%]"></div>
          )}

          <img
            src={selectedValue === "audio" ? audio1 : audio}
            alt="audio"
            className="w-6 h-6 mx-3 "
          />
          <p className={selectedValue === "audio" ? "text-blue-500" : "#000"}>
            Audio
          </p>
        </div>
        <div
          onClick={() => setSelectedValue("video")}
          className="flex items-center cursor-pointer mx-4 relative"
        >
          {selectedValue === "video" && (
            <div className=" absolute border-b-4 border-blue-500 border-solid -bottom-3 left-3 w-[90%]"></div>
          )}

          <img
            src={selectedValue === "video" ? video1 : video}
            alt="video"
            className="w-6 h-6 mx-3 "
          />
          <p className={selectedValue === "video" ? "text-blue-500" : "#000"}>
            Video
          </p>
        </div>
        <div
          onClick={() => setSelectedValue("link")}
          className="flex items-center cursor-pointer mx-4 relative"
        >
          {selectedValue === "link" && (
            <div className=" absolute border-b-4 border-blue-500 border-solid -bottom-3 left-3 w-[90%]"></div>
          )}

          <img
            src={selectedValue === "link" ? link1 : link}
            alt="link"
            className="w-6 h-6 mx-3 "
          />
          <p className={selectedValue === "link" ? "text-blue-500" : "#000"}>
            Link
          </p>
        </div>
        <div
          onClick={() => setSelectedValue("doc")}
          className="flex items-center cursor-pointer mx-4 relative"
        >
          {selectedValue === "doc" && (
            <div className=" absolute border-b-4 border-blue-500 border-solid -bottom-3 left-3 w-[90%]"></div>
          )}

          <img
            src={selectedValue === "doc" ? doc1 : doc}
            alt="doc"
            className="w-6 h-6 mx-3 "
          />
          <p className={selectedValue === "doc" ? "text-blue-500" : "#000"}>
            Document
          </p>
        </div>
      </div>

      <div className="mt-7 lg:mt-10 sm:mt-8 flex flex-wrap lg:gap-5 sm:gap-3 justify-start">
        {allResources.length === 0 ? (
          <>
            <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 ">
              <Spinner />
            </div>
          </>
        ) : (
          <>
            {allResources.map((resource) => {
              return (
                <div className="h-full lg:w-[23%] sm:w-[40%] w-[90%] xs:w-[75%] ms:w-[60%] sm:mt-8 mt-5 relative  bg-gray-100 rounded-md overflow-hidden shadow-lg shadow-[#3333336a]">
                  {/* content */}
                  <div>
                    <div className="w-full">
                      <img
                        onClick={() => window.open(resource.link, "_blank")}
                        className="w-full h-[200px] rounded-tl-lg rounded-tr-lg object-cover"
                        src={resource.image}
                        alt=""
                      />
                    </div>
                    <div
                      style={{ border: "1px solid rgba(0, 0, 0, 0.15)" }}
                      className="flex py-4 px-4 rounded-bl-lg rounded-br-lg min-h-full"
                    >
                      {resource.category === "doc" && (
                        <img src={doc} alt="doc" className="mx-4" sizes={20} />
                      )}
                      {resource.category === "link" && (
                        <img
                          src={link}
                          alt="link"
                          className="mx-4"
                          sizes={20}
                        />
                      )}
                      {resource.category === "image" && (
                        <img
                          src={image}
                          alt="img"
                          className="mx-4"
                          sizes={20}
                        />
                      )}
                      {resource.category === "audio" && (
                        <img
                          src={audio}
                          alt="audio"
                          className="mx-4"
                          sizes={20}
                        />
                      )}
                      {resource.category === "video" && (
                        <img
                          src={video}
                          alt="video"
                          className="mx-4"
                          sizes={20}
                        />
                      )}
                      <p className="text-[#191D23] text-[14px]">
                        {toTitleCase(resource.name)}
                      </p>
                    </div>
                  </div>

                  {/* setting */}
                  <div>
                    <div className="absolute top-3 right-2">
                      <MoreVertical
                        onClick={() => {
                          setSettingStatus(!settingStatus);
                          setResourceId(resource.id);
                        }}
                        className="text-[#868686] cursor-pointer"
                        size={22}
                      />
                    </div>
                    <div
                      style={{
                        border: " 1px solid rgba(0, 0, 0, 0.15)",
                        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)",
                      }}
                      className={`${
                        settingStatus && resource.id === resourceId
                          ? `block`
                          : `hidden`
                      } absolute top-10 right-3 bg-white rounded-md`}
                    >
                      <li
                        className="list-none py-[8px] cursor-pointer px-6 hover:bg-[#ddd] transition duration-300"
                        onClick={() => {
                          setSettingStatus(!settingStatus);
                          window.open(resource.link, "_blank");
                        }}
                      >
                        Open file
                      </li>
                      <li
                        className="list-none py-[8px] cursor-pointer px-6 hover:bg-[#ddd] transition duration-300"
                        onClick={() => {
                          setModalType("editResource");
                          setResourceId(resource.id);
                          setSettingStatus(!settingStatus);
                          setModalStatus(true);
                        }}
                      >
                        Rename
                      </li>
                      <li className="list-none py-[8px] cursor-pointer px-6 hover:bg-[#ddd] transition duration-300">
                        <CopyToClipboard
                          text={resource.link}
                          onCopy={() => {
                            setCopySuccess(true);
                            setResourceId(resource.id);
                            setSettingStatus(!settingStatus);
                          }}
                        >
                          <span>Copy Link</span>
                        </CopyToClipboard>
                      </li>
                      <li
                        className="list-none py-[8px] cursor-pointer px-6 hover:bg-[#ddd] transition duration-300"
                        onClick={() => {
                          handleDelete(resource.id);
                          setSettingStatus(!settingStatus);
                        }}
                      >
                        Delete
                      </li>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <Modals
        modalStatus={modalStatus}
        modalClose={modalClose}
        modalType={modalType}
        resourceData={
          allResources.filter((resource) => resource.id === resourceId)[0]
        }
        fetchAllResources={fetchAllResources}
      />
       
    </div>
  );
};

export default Resources;
