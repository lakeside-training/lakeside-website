import React, { lazy } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Toaster } from "react-hot-toast"

// ** api loader
import ApiLoader from "./components/ApiLoader"
import AuthProvider from "./contexts/AuthContext";

import awsExports from './aws-exports';
import {Amplify} from "aws-amplify";
Amplify.configure(awsExports);

const App = lazy(() => import("./App"))
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <Toaster position="top-center" />
      <AuthProvider>
          <ApiLoader />
            <App />
      </AuthProvider>

  </Provider>
)
