import axios from "./axios"

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
  
  // "https://lake-side-backend-production.up.railway.app"
  
})

export default instance

// "trigger"

