import React, { lazy } from "react"
import "./index.css"

import ReactDOM from "react-dom/client"

// ** import redux
import { Provider } from "react-redux"
import { store } from "./redux/store"

// ** import third party
import { Toaster } from "react-hot-toast"
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import AuthProvider from "./contexts/AuthContext";
Amplify.configure(awsExports);

const App = lazy(() => import("./App"))
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(

  <Provider store={store}>
    {/* <ApiLoader /> */}
    <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
          <App />
      </AuthProvider>
  </Provider>
)
