import appLogo from "../assets/app-logo.png"

export const RouteLoading = () => {
   return (
      <div>
         <div className="bg-black w-full text-white">Loading...</div>
      </div>
   )
}

type TLogoLoadingProps = Partial<{
   className: string
   borderClassName: string
   logoImgClassName: string
}>

export const LogoLoading = ({
   className,
   borderClassName,
   logoImgClassName,
}: TLogoLoadingProps) => {
   return (
      <div className={`flex relative h-fit aspect-square p-2 ${className || ""}`}>
         <div className={`css-logo-loading-border ${borderClassName || ""}`}></div>
         <img
            src={appLogo}
            alt="App Logo"
            className={`m-auto relative z-20 h-[1.2rem] w-min ${logoImgClassName || ""}`}
         />
      </div>
   )
}
