import { useState, useRef } from "react"

const AvatarUploader = () => {
   const [avatar, setAvatar] = useState<string | null>(null)
   const fileInputRef = useRef<HTMLInputElement | null>(null)

   // Xử lý chọn file từ input
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setAvatar(imageUrl)
      }
   }

   // Kéo và thả file vào vùng Avatar
   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const file = event.dataTransfer.files?.[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setAvatar(imageUrl)
      }
   }

   // Ngăn chặn hành vi mặc định khi kéo file vào
   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
   }

   return (
      <div
         className="avatar-container"
         onClick={() => fileInputRef.current?.click()}
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: avatar ? `url(${avatar})` : "none",
         }}
      >
         {!avatar && <span>Click or Drop Image</span>}
         <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
         />
      </div>
   )
}

export default AvatarUploader
