import React from "react"
import { BrowserRouter } from "react-router-dom"

// ** import all Router
import Router from "./router/Router"
import "@fontsource/plus-jakarta-sans"

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
