import React from "react";
import { MdContentCopy } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import warning from "../../assets/svg/warning.svg";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const Popup = ({ show, hide, id, label }) => {
  const navigate = useNavigate();
  const close = () => {
    return hide(false);
  };
  const userToken = localStorage.getItem("userToken");

  const deleteCourse = async (e) => {
    if (label === "lab") {
      e.preventDefault();
      const { data } = await axios.post(
        "/lab/delete",
        {
          id,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (data?.success) {
        toast.success("Lab Deleted Successfully");
        hide(false);
        navigate("/lab");
      }
    } else {
      e.preventDefault();
      const { data } = await axios.post(
        "/course/delete",
        {
          id,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (data?.success) {
        toast.success("Course Deleted Successfully");
        hide(false);
        navigate("/courses");
      }
    }
  };

  return (
    <div>
      {show && (
        <>
          <div
            id="popup-modal"
            tabindex="-1"
            class=" fixed top-1 right-6 h-full w-screen bg-[#706f6f33] flex flex-1 justify-center items-center "
            aria-hidden="true"
            // onClick={() => hide(true)}
          >
            <div class="relative w-full max-w-md h-full md:h-auto">
              <div
                style={{ boxShadow: "2px 2px 10px #ddd" }}
                class="relative bg-white rounded-lg w-[350px]"
              >
                <button
                  type="button"
                  class="absolute top-1 right-2 text-red bg-transparent hover:bg-gray hover:text-red rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:bg-gray dark:hover:text-white transition-all duration-300"
                  data-modal-toggle="popup-modal"
                  onClick={close}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div class="text-center flex items-center flex-col">
                  <div className="my-3 flex flex-col items-center  bg-grayLight rounded">
                    <img src={warning} alt="warning" className="my-6" />

                    <p className=" font-semibold text-lg ">
                      Delete {label === "lab" ? "Lab" : "Course"}
                    </p>
                    <p className="text-base font-medium w-[70%]">
                      Are you sure that you want to delete this{" "}
                      {label === "lab" ? "lab" : "course"}?{" "}
                    </p>
                    <div className="flex items-center gap-4 justify-center w-[80%] my-6 ">
                      <button
                        className="py-2 px-8 border-2 border-black border-solid rounded-lg"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={deleteCourse}
                        className="py-2 px-10 border-2 bg-primary text-white rounded-lg hover:bg-gray-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Popup;
