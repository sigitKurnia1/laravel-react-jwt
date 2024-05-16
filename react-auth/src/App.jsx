//Import react router dom
import {Routes, Route } from "react-router-dom"

//Import component register
import Register from "./pages/Register"

//Import component login
import Login from "./pages/Login"

//Import component dashboard
import Dashboard from "./pages/Dashboard"

const App = () => {
  return (
    <div>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}

export default App
