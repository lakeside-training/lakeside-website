import React from "react"
import { BrowserRouter } from "react-router-dom"
import "./styles/style.css"
import "@fontsource/plus-jakarta-sans"

// ** import all Router
import Router from "./router/Router"

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
