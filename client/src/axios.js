import axios from "axios"

const baseURL = 
'https://lake-side-backend-production-fb46.up.railway.app'



// process.env.NODE_ENV === "production"
//   ? process.env.REACT_APP_SERVER_URL
//  "http://localhost:5000"

const instance = axios.create({
    baseURL
})

export default instance
