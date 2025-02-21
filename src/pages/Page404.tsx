import { LogoLoading } from "../components/Loadings"

export default function page() {
   return (
      <div className="flex flex-col items-center justify-center bg-gray-100 h-screen w-screen p-5">
         <div>
            <LogoLoading color="black" />
         </div>
         <div className="flex flex-col items-center justify-center text-center mt-10">
            <h1 className="text-2xl font-bold text-gray-800">Processing authorization code...</h1>
            <p className="mt-4 text-gray-600">Please wait for few minutes.</p>
         </div>
      </div>
   )
}
