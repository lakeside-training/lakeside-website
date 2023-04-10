import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkIcon from "../Shared/LinkIcon";
import { useState } from "react";
import ImgUpload from "../ImgUpload";
import toast from "react-hot-toast";
import { trackPromise } from "react-promise-tracker";

import axios from "../../axios";
import { Link } from "react-feather";
import Spinner from "../spinner/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #B6B6B6",
  outline: "none",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

const Modals = ({
  modalStatus,
  modalClose,
  modalType,
  fetchAllResources,
  resourceData,
}) => {
  const userToken = localStorage.getItem("userToken");

  console.log(modalType);

  const [image, setImage] = useState([]);
  const [resource, setResource] = useState({
    name: "",
    image: "",
    link: "",
  });

  const [editImage, setEditImage] = useState([]);
  const [editResource, setEditResource] = useState({
    name: "",
    image: "",
    link: "",
    category: "",
  });
  const [resourceFile, setFile] = useState(null);
  const [resourceLink, setLink] = useState("");
  const [loadder, setLoadder] = useState(false);


  useEffect(() => {
    setEditResource({
      name: resourceData?.name || "",
      image: "",
      link: resourceData?.link || "",
      oldImg: resourceData?.link || "",
      category: resourceData?.category,
    });
    setEditImage(resourceData?.image);
  }, [resourceData]);

  //   handle change
  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditResource({ ...editResource, [e.target.name]: e.target.value });
  };

  //   handle clear
  const handleClear = () => {
    setResource({
      name: "",
      image: "",
      link: "",
    });
    setImage([]);
  };

  const handleFileConversion = async () => {
    setLoadder(true);
    if (
      resourceLinkStatus === "image" ||
      resourceLinkStatus === "audio" ||
      resourceLinkStatus === "video" ||
      resourceLinkStatus === "doc"
    ) {
      if (resourceFile === null) {
        toast.error("Please choose a file");
        setLoadder(false);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
          handleSubmit(e.target.result);
        };
        reader.readAsDataURL(resourceFile);
      }
    } else {
      if (resourceLink) {
        handleSubmit(resourceLink);
      } else if (resourceLink === false) {
        toast.error("Please choose a valid link");
        setLoadder(false);
      } else {
        toast.error("Please enter a link");
        setLoadder(false);
      }
    }
  };

  // handle submit
  const handleSubmit = async (base64) => {
    console.log(base64); // you will get all file here if user select file then you will get file else you will get image
    const newData = {
      name: resource.name,
      image: image,
      link: base64,
      category: resourceLinkStatus,
    };

    if (newData.title === "" || newData.image === "") {
      toast.error("Please fill all the fields");
      setLoadder(false);

      return;
    } else if (newData.image.length === 0) {
      toast.error("Please select an image");
      setLoadder(false);

      return;
    }

    try {
      const { data } = await axios.post("/resources/add", newData, {
        headers: {
          authorization: userToken,
        },
      });

      if (data.success) {
        toast.success(data.message);
        handleClear();
        modalClose();
        fetchAllResources();
        return;
      }
      toast.error(data.message);
      setLoadder(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
      setLoadder(false);
    }
  };

  //   handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      name: editResource.name,
      image: editImage,
      link: editResource.link,
      oldImg: editResource.oldImg,
      isChangeImg: typeof editImage === "object" ? true : false,
      category: editResource.category,
    };

    if (newData.title === "" || newData.image === "" || newData.link === "") {
      toast.error("Please fill all the fields");
      return;
    } else if (newData.image.length === 0) {
      toast.error("Please select an image");
      return;
    }

    try {
      const { data } = await axios.post(
        `/resources/update/${resourceData.id}`,
        newData,
        {
          headers: { authorization: userToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        modalClose();
        fetchAllResources();
        return;
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    }
  };
  const [resourceLinkStatus, setResourceLinkStatus] = useState("");
  const changeStatus = (e) => {
    e.target.previousSibling.previousSibling.checked = true;
    setResourceLinkStatus(e.target.previousSibling.previousSibling.value);
  };

  const handleFileInputChange = (event) => {
    if (resourceLinkStatus === "image") {
      const selectedFile = event.target.files[0];
      const imageName = selectedFile.name.split(".");
      if (
        imageName[imageName.length - 1] === "jpeg" ||
        imageName[imageName.length - 1] === "jpg" ||
        imageName[imageName.length - 1] === "png" ||
        imageName[imageName.length - 1] === "gif"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please choose a valid image file");
      }
    }
    if (resourceLinkStatus === "audio") {
      const selectedFile = event.target.files[0];
      const imageName = selectedFile.name.split(".");
      if (
        imageName[imageName.length - 1] === "mp3" ||
        imageName[imageName.length - 1] === "m4a" ||
        imageName[imageName.length - 1] === "wav" ||
        imageName[imageName.length - 1] === "flac"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please choose a valid audio file");
      }
    }
    if (resourceLinkStatus === "video") {
      const selectedFile = event.target.files[0];
      const imageName = selectedFile.name.split(".");
      if (
        imageName[imageName.length - 1] === "mp4" ||
        imageName[imageName.length - 1] === "wmv" ||
        imageName[imageName.length - 1] === "mov" ||
        imageName[imageName.length - 1] === "avl"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please choose a valid video file");
      }
    }
    if (resourceLinkStatus === "doc") {
      const selectedFile = event.target.files[0];

      const imageName = selectedFile.name.split(".");
      if (
        // imageName[imageName.length - 1] === "doc" ||
        // imageName[imageName.length - 1] === "docx" ||
        imageName[imageName.length - 1] === "pdf"
        // imageName[imageName.length - 1] === "rft" ||
        // imageName[imageName.length - 1] === "txt" ||
        // imageName[imageName.length - 1] === "tex" ||
        // imageName[imageName.length - 1] === "wpd" ||
        // imageName[imageName.length - 1] === "xls" ||
        // imageName[imageName.length - 1] === "pptx"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please choose a valid document file");
      }
    }
    if (resourceLinkStatus === "link") {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      const check = pattern.test(event.target.value);
      if (check) {
        setLink(event.target.value);
      } else {
        setLink(false);
      }
    }
  };

  return (
    <>
      {modalType === "rename" && (
        <div className=" !z-40 relative">
          <Modal
            open={modalStatus}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="!rounded-md !w-[90%] ms:!w-[auto]"
          >
            <Box sx={style}>
              <div
                onClick={modalClose}
                className="absolute top-[-18px] right-[-20px] hover:-translate-y-1 hover:scale-110 duration-300 w-[35px] h-[35px] rounded-full text-white flex justify-center items-center cursor-pointer bg-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p className="text-xl font-semibold text-center">
                  Rename Resource
                </p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                  <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                    Resource Name
                  </p>
                  <input
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Name"
                    className="border block py-2 w-full text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                  />
                  <div className="flex justify-between mt-5">
                    <button
                      onClick={modalClose}
                      className="flex items-center py-[9px] px-10 bg-white hover:bg-black text-blaock rounded-lg transition duration-300 border-2 border-black hover:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center py-[9px] px-10 bg-black text-white rounded-lg transition duration-300 border-2 border-black hover:text-black hover:bg-white"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          
        </div>
      )}
      {modalType === "addResource" && (
        <div >
          <Modal
            open={modalStatus}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="!rounded-md"
          >
            <Box sx={style}>
              <form className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  trackPromise(handleFileConversion());
                }}
              >
                <div
                  onClick={modalClose}
                  className="absolute top-[-38px] right-[-35px] hover:-translate-y-1 hover:scale-110 duration-300 w-[35px] h-[35px] rounded-full text-white flex justify-center items-center cursor-pointer bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <p className="text-xl font-semibold text-center">
                    Add Resources
                  </p>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div>
                    <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                      Resource Name
                    </p>
                    <input
                      type="text"
                      name="name"
                      required
                      value={resource.name}
                      onChange={handleChange}
                      placeholder="Resource Name"
                      className="border block py-2 w-full text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                      Resource
                    </p>
                    <div className="relative border border-gray-300 rounded-[5px] p-2">
                      <div className="flex flex-wrap pb-3 gap-3">
                        <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3 w-[30%] py-1.5">
                          <input type="radio" name="recourse" value="image" />
                          <p className="ml-3">Image</p>
                          <div
                            onClick={changeStatus}
                            className="absolute w-full h-full top-0 left-0"
                          ></div>
                        </div>

                        <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3 w-[30%] py-1.5">
                          <input type="radio" name="recourse" value="audio" />
                          <p className="ml-3">Audio</p>
                          <div
                            onClick={changeStatus}
                            className="absolute w-full h-full top-0 left-0"
                          ></div>
                        </div>

                        <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3 w-[30%] py-1.5">
                          <input type="radio" name="recourse" value="video" />
                          <p className="ml-3">Video</p>
                          <div
                            onClick={changeStatus}
                            className="absolute w-full h-full top-0 left-0"
                          ></div>
                        </div>

                        <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3 w-[30%] py-1.5">
                          <input type="radio" name="recourse" value="link" />
                          <p className="ml-3">Link</p>
                          <div
                            onClick={changeStatus}
                            className="absolute w-full h-full top-0 left-0"
                          ></div>
                        </div>

                        <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3 w-[30%] py-1.5">
                          <input type="radio" name="recourse" value="doc" />
                          <p className="ml-3">Doc</p>
                          <div
                            onClick={changeStatus}
                            className="absolute w-full h-full top-0 left-0"
                          ></div>
                        </div>
                      </div>
                      {resourceLinkStatus === "image" && (
                        <input
                          type="file"
                          onChange={handleFileInputChange}
                          className="w-full"
                          accept="image/*"
                        />
                      )}
                      {resourceLinkStatus === "audio" && (
                        <input
                          type="file"
                          onChange={handleFileInputChange}
                          className="w-full"
                          accept="audio/*"
                        />
                      )}
                      {resourceLinkStatus === "video" && (
                        <input
                          type="file"
                          onChange={handleFileInputChange}
                          className="w-full"
                          accept="video/*"
                        />
                      )}
                      {resourceLinkStatus === "doc" && (
                        <input
                          type="file"
                          onChange={handleFileInputChange}
                          className="w-full"
                          accept="application/pdf"
                        />
                      )}
                      {resourceLinkStatus === "link" && (
                        <div className="relative">
                          <input
                            onChange={handleFileInputChange}
                            type="text"
                            placeholder="Paste Link"
                            className="w-full border border-gray-300 rounded-[5px] !pl-[2.75rem]"
                          />
                          <Link
                            className="absolute left-3 top-2.5 text-[#868686]"
                            size={20}
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-[100%] mt-4">
                      <div>
                        <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                          Course Resource Image
                        </p>
                      </div>
                      <div className="w-full flex items-center space-x-6">
                        <ImgUpload
                          images={image}
                          setImages={setImage}
                          size={12}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-5">
                      <button
                        onClick={modalClose}
                        className="flex items-center py-[9px] px-10 bg-white hover:bg-black text-blaock rounded-lg transition duration-300 border-2 border-black hover:text-white"
                      >
                        Cancel
                      </button>
                      <button className="flex items-center py-[9px] px-10 bg-black text-white rounded-lg transition duration-300 border-2 border-black hover:text-black hover:bg-white">
                        Save
                      </button>
                    </div>
                  </div>
                </Typography>
                {loadder && (
        <div className="fixed flex items-center justify-center top-[0%] bottom-[0%] left-[0%] right-[0%] bg-transparent w-full h-full">
          <Spinner />
        </div>
      )}
              </form>
              
            </Box>
          </Modal>
          
        </div>
      )}
      {modalType === "editResource" && (
        <div>
          <Modal
            open={modalStatus}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="!rounded-md"
          >
            <Box sx={style}>
              <form onSubmit={handleEditSubmit}>
                <div
                  onClick={modalClose}
                  className="absolute top-[-18px] right-[-20px] hover:-translate-y-1 hover:scale-110 duration-300 w-[35px] h-[35px] rounded-full text-white flex justify-center items-center cursor-pointer bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <p className="text-xl font-semibold text-center">
                    Add Resources
                  </p>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div>
                    <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                      Resource Name
                    </p>
                    <input
                      type="text"
                      name="name"
                      required
                      value={editResource.name}
                      onChange={handleEditChange}
                      placeholder="Resource Name"
                      className="border block py-2 w-full text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                      Resource Link
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        name="link"
                        id=""
                        required
                        value={editResource.link}
                        onChange={handleEditChange}
                        placeholder="Resource Link"
                        className="border block py-2 pl-12 w-full text-md border-gray-300 font-normal !text-gray-900 placeholder-gray-500 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 caret-indigo-600"
                      />
                      <div className="absolute top-2 left-3">
                        <LinkIcon />
                      </div>
                    </div>
                    <div className="w-[100%] mt-4">
                      <div>
                        <p className="text-[#52525B] mb-[5px] text-sm font-semibold">
                          Course Resource Image
                        </p>
                      </div>
                      <div className="w-full flex items-center space-x-6">
                        <ImgUpload
                          images={editImage}
                          setImages={setEditImage}
                          size={12}
                          removeImg={() => {
                            setEditImage([]);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-5">
                      <button
                        onClick={modalClose}
                        className="flex items-center py-[9px] px-10 bg-white hover:bg-black text-blaock rounded-lg transition duration-300 border-2 border-black hover:text-white"
                      >
                        Cancel
                      </button>
                      <button className="flex items-center py-[9px] px-10 bg-black text-white rounded-lg transition duration-300 border-2 border-black hover:text-black hover:bg-white">
                        Save
                      </button>
                    </div>
                  </div>
                </Typography>
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Modals;
