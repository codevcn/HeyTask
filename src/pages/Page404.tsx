import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"

const { VITE_TINYMCE_API_KEY } = import.meta.env

export default function Page404() {
   const editorRef = useRef<TinyMCEEditor | null>(null)

   const plugins: string = "autolink lists link image fullscreen code"

   const toolbar: string =
      "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat link"

   return (
      <div className="p-5 marker:text-red-500">
         <p>
            <span style={{ color: "#ced4d9" }}>oke lala</span>
            <span style={{ color: "#e03e2d" }}>
               <em>
                  <strong>
                     {" "}
                     vcn! no no no.
                     <a
                        title="js stackover floow"
                        href="https://stackoverflow.com/questions/59951753/how-to-keep-tinymce-icons-bar-sticky-positioned-on-top"
                        target="_blank"
                        rel="noopener"
                     >
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                     </a>
                  </strong>
               </em>
            </span>
         </p>
         <ol className="list-decimal marker:text-red-500">
            <li>
               <span style={{ color: "#ced4d9" }}>aaadadadda</span>
            </li>
            <li>
               <span style={{ color: "#ced4d9" }}>sssss</span>
            </li>
         </ol>
      </div>
   )
}
