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
   logoImgClassName: string
}>

export const LogoLoading = ({ className, logoImgClassName }: TLogoLoadingProps) => {
   return (
      <div className={`flex relative h-fit w-fit aspect-square p-2 ${className || ""}`}>
         <div className="css-logo-loading-border"></div>
         <img
            src={appLogo}
            alt="App Logo"
            className={`relative z-20 h-[1.2rem] w-min ${logoImgClassName || ""}`}
         />
      </div>
   )
}
