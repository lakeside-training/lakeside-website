import { Upload } from "@aws-sdk/lib-storage"
import { S3Client, S3, PutObjectCommand } from "@aws-sdk/client-s3"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** check  is  array ( true ) or sting (false)
export const isArrOrStr = (data) => {
  if (typeof data === "string") {
    return false
  } else {
    return true
  }
}

// large file upload funtion & return file url from s3
export const uploadFileToS3 = async (file) => {
  // const file type
  const fileType = file.type.split("/")[0]

  const s3 = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
    }
  })

  const params = {
    Bucket: "peacockimage",
    Key: `lakeside/resource/${file.name}`,
    Body: file
  }

  try {
    // const data = await s3.send(new PutObjectCommand(params))

    const parallelUploads3 = new Upload({
      client: s3,
      params: params,
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false
    })

    await parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("progress", progress)
    })

    const data = await parallelUploads3.done()

    return { data, ContentType: fileType }
  } catch (err) {
    console.log("Error", err)
  }
}

export const toTitleCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ")
