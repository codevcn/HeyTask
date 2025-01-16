import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { RouteGuard } from "./ResourceGuard"

const nonGuardRoutes: string[] = ["/", "/login", "/register"]

export default function Layout() {
   return (
      <div className="h-full text-sm">
         <RouteGuard nonGuardRoutes={nonGuardRoutes}>
            <Outlet />
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
      </div>
   )
}
