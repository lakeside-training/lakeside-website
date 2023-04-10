import React from "react"
import ImageUploading from "react-images-uploading"

// ** import icons
import { UploadCloud } from "react-feather"

const ImgUpload = ({
  images,
  setImages,
  isMultiple,
  size,
  removeImg,
  isRemoveAll,
  type
}) => {
  // images functions
  const onChange = (imageList, addUpdateIndex) => {
    console.log("image on Change", imageList)
    setImages(imageList)
  }

  return (
    <div>
      {
        // check images is arra ot string
        typeof images === "string" ? (
          <div className="flex items-center gap-6 py-2">
            <img
              src={images ? images : "https://via.placeholder.com/150"}
              alt="img"
              className="img-fluid rounded-md"
              style={{ width: "150px" }}
            />
            <div className="ml-1">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeImg()}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <ImageUploading
            multiple={isMultiple}
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
            // acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              // write your building UI
              <div className="upload__image-wrapper ">
                {images.length === 0 ? (
                  <div
                    className=" flex gap-4 items-center !-mb-2.5 cursor-pointer  "
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <div>
                      <div className="flex items-center justify-center w-full cursor-pointer">
                        <label className="flex flex-co cursor-pointerl rounded-lg border-4 border-dashed w-11 h-10 p-6 group text-center bg-white">
                          <div className=" cursor-pointer relative">
                            <UploadCloud
                              size={24}
                              className=" cursor-pointer absolute -top-2.5 -left-3 text-gray-400 "
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    <p className="block">
                      Upload
                    </p>
                  </div>
                ) : null}
                &nbsp;
                {isRemoveAll ? (
                  <button onClick={onImageRemoveAll}>Remove all images</button>
                ) : null}
                {Array.isArray(imageList) && imageList?.length
                  ? imageList?.map((image, index) => (
                      <div
                        key={index}
                        className="image-item flex items-center space-x-6"
                      >
                        <img
                          src={image.data_url}
                          alt=""
                          className={`w-${size || 12} h-${
                            size || 12
                          } rounded-lg`}
                        />
                        <div className="image-item__btn-wrapper flex items-center gap-5">
                          <button
                            type="button"
                            className="text-sm font-semibold text-indigo-600 transition-all duration-200 bg-transparent rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            onClick={() => onImageUpdate(index)}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="text-sm font-semibold text-red-500 transition-all duration-200 bg-transparent rounded-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                            onClick={() => onImageRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </ImageUploading>
        )
      }
    </div>
  )
}

export default ImgUpload
