import React, { lazy } from "react"
import "./index.css"

import ReactDOM from "react-dom/client"

// ** import redux
import { Provider } from "react-redux"
import { store } from "./redux/store"

// ** import third party
import { Toaster } from "react-hot-toast"

// ** import api loader
import ApiLoader from "./components/ApiLoader"

const App = lazy(() => import("./App"))
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    {/* <ApiLoader /> */}
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </Provider>
)
