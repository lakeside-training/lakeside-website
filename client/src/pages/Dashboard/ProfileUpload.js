import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import axios from "../../axios";
import toast from 'react-hot-toast'


const ProfileUpload = ({ close, uploads, uploadStatus }) => {
  const [preview, setPreview] = useState(null);
  const [btn, setBtn] = useState(true);

  const upload = async () => {
    const userID = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const { data } = await axios.post("/profile/uploads", {
        profile: preview,
      });

      if (data) {
        const datas =  await axios.post('/user/update', {
          _id: userID[0].id,
          profilePic : data
        })
        if(datas.data === 'Course updated successfully '){
          setPreview(null);
          setBtn(false);
          toast.success('Successfull Uploaded')
          uploadStatus('sucess')
          close()
          uploads('Course updated successfully ')

        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };
  return (
    <div>
      <div className="modal show fade fixed top-20 left-0  w-full h-full outline-none overflow-x-hidden overflow-y-auto">
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Profile Upload
              </h5>
              <button
                type="button"
                onClick={close}
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                X{" "}
              </button>
            </div>
            <div className="modal-body relative p-4 left-2">
              <Avatar
                width={450}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
              />
              {btn && (
                <div
                  style={{
                    margin: "10px 0 0 0",
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() => upload()}
                    type="button"
                    className="px-6  py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                  >
                    Upload
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileUpload;

// <!-- Modal -->
