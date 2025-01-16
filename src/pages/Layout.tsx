import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function Layout() {
   return (
      <div className="h-full">
         <Outlet />
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
