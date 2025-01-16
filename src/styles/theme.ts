import { createTheme } from "@mui/material/styles"

const theme = createTheme({
   palette: {
      primary: {
         main: "#1976d2", // Màu xanh dương mặc định
      },
      secondary: {
         main: "#9c27b0", // Màu tím
      },
   },
   typography: {
      fontFamily: "Roboto, Arial, sans-serif",
   },
})

export default theme
