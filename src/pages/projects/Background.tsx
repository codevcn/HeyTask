import { useAppSelector } from "../../hooks/redux"

type TBackgroundProps = {
   children: JSX.Element
}

export const Background = ({ children }: TBackgroundProps) => {
   const { project } = useAppSelector(({ project }) => project)
   const projectBackground = project?.background

   return (
      <div
         className="w-full h-background bg-cover bg-[center_center] bg-blend-darken bg-float-fade-layer-bgcl"
         style={{
            backgroundImage: projectBackground ? `url(${projectBackground})` : "none",
         }}
      >
         {children}
      </div>
   )
}
