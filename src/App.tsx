import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home/Home-Page"
import LoginPage from "./pages/auth/Login-Page"
import Layout from "./pages/Layout"
import Page404 from "./pages/Page-404"
import "react-toastify/dist/ReactToastify.css"
import RegisterPage from "./pages/auth/Register-Page"
import "./styles/global.scss"

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
         </Route>

         <Route path="*" element={<Page404 />} />
      </Routes>
   )
}

export default App
