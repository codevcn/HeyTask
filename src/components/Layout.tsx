import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { RouteGuard } from "./ResourceGuard"
import { useEffect } from "react"
import { FixedLoading } from "./Loadings"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AppSnackbar } from "./Snackbar"

const nonGuardRoutes: string[] = ["/", "/login", "/register"]

export default function Layout() {
   useEffect(() => {
      const handleDisableModalBehavior = (e: FocusEvent) => {
         const target = e.target
         if (target && target instanceof HTMLElement && target.closest) {
            if (
               target.closest(
                  ".tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root",
               ) !== null
            ) {
               e.stopImmediatePropagation()
            }
         }
      }
      document.addEventListener("focusin", handleDisableModalBehavior)
      return () => {
         document.removeEventListener("focusin", handleDisableModalBehavior)
      }
   }, [])

   return (
      <div className="h-full text-sm">
         <FixedLoading />
         <RouteGuard nonGuardRoutes={nonGuardRoutes}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <Outlet />
            </LocalizationProvider>
         </RouteGuard>
         <ToastContainer
            position="top-right"
            autoClose={5000} // Đóng sau 5 giây
            hideProgressBar={false} // Hiển thị thanh tiến trình
            newestOnTop={true} // Sắp xếp thông báo mới lên trên
            closeOnClick
            rtl={false} // Hỗ trợ ngôn ngữ RTL
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         <AppSnackbar />
      </div>
   )
}
