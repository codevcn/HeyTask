import authBgLeft from "../../assets/trello-left.4f52d13c.svg"
import authBgRight from "../../assets/trello-right.e6e102c7.svg"
import appLogo from "../../assets/app-logo.png"
import { TextField, Button, IconButton, CircularProgress } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useState } from "react"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { NavLink } from "react-router-dom"
import { authService } from "../../services/auth-service"
import { useForm } from "react-hook-form"
import validator from "validator"
import { pureNavigator } from "../../utils/helpers"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { passwordRegex } from "../../utils/regex"
import { OAuth } from "./OAuth"

interface IFormData {
   email: string
   password: string
}

const LoginPage = () => {
   const [showPassword, setShowPassword] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm<IFormData>()

   const validateForm = (data: IFormData): boolean => {
      let isValid: boolean = true
      if (!validator.isEmail(data.email)) {
         setError("email", { message: "Email không hợp lệ." })
         isValid = false
      }
      if (!passwordRegex.test(data.password)) {
         setError("password", {
            message: "Mật khẩu phải có ít nhất 4 kí tự, 1 chữ viết thường và 1 số.",
         })
         isValid = false
      }
      return isValid
   }

   const loginHandler = (data: IFormData) => {
      if (validateForm(data)) {
         setLoading(true)
         authService
            .login(data)
            .then(() => {
               pureNavigator("/dashboard")
            })
            .catch((error) => {
               toast.error(axiosErrorHandler.handleHttpError(error).message)
            })
            .finally(() => {
               setLoading(false)
            })
      }
   }

   const handleShowPassword = () => {
      setShowPassword((pre) => !pre)
   }

   return (
      <section className="relative z-10 bg-transparent w-full min-h-screen py-12">
         <div
            style={{
               backgroundImage: `url(${authBgLeft}), url(${authBgRight})`,
               backgroundRepeat: "no-repeat, no-repeat",
               backgroundAttachment: "fixed, fixed",
               backgroundSize: "368px, 368px",
               backgroundPosition: "left bottom, right bottom",
            }}
            className="flex bg-[#fafbfc] absolute w-full h-full -z-[1] top-0 left-0"
         ></div>

         <div className="flex flex-col items-center w-[400px] py-[32px] px-[40px] rounded bg-white m-auto shadow-md text-[#44546f]">
            <div className="flex gap-x-[5px] items-center text-black">
               <img src={appLogo} alt="App Logo" className="h-[35px]" />
               <span className="text-[2rem] font-bold">HeyTask</span>
            </div>
            <span className="font-semibold mt-5">Login to continue.</span>
            <form action="#" onSubmit={handleSubmit(loginHandler)} className="w-full">
               <div className="w-full mt-6">
                  <TextField
                     variant="outlined"
                     size="small"
                     label="Enter your email..."
                     fullWidth
                     {...register("email")}
                     error={!!errors.email}
                     helperText={errors.email?.message || ""}
                  />
               </div>
               <div className="w-full mt-3 relative">
                  <TextField
                     variant="outlined"
                     size="small"
                     label="Enter your password..."
                     fullWidth
                     type={showPassword ? "text" : "password"}
                     {...register("password")}
                     error={!!errors.password}
                     helperText={errors.password?.message || ""}
                  />
                  <div onClick={handleShowPassword} className="absolute top-[1px] right-0">
                     <IconButton>{showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
                  </div>
               </div>
               <Button
                  sx={{ marginTop: "20px", fontWeight: "bold", color: "white" }}
                  variant="contained"
                  size="medium"
                  fullWidth
                  {...(loading ? {} : { endIcon: <SendIcon /> })}
                  type="submit"
               >
                  {loading ? (
                     <CircularProgress thickness={5} size={24.5} color="inherit" />
                  ) : (
                     <span>Login</span>
                  )}
               </Button>
            </form>
            <OAuth />
            <div className="flex gap-x-[5px] mt-5">
               <span>You haven't had an account?</span>
               <NavLink to="/register" className="font-bold text-yellow-700 hover:underline">
                  Register
               </NavLink>
            </div>
         </div>
      </section>
   )
}

export default LoginPage
