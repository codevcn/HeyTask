import { createContext, useContext } from "react"

export type TProjectMenuActive = "about-project" | undefined

export type TProjectMenuContext = {
   menuItemActive: TProjectMenuActive
   setMenuItemActive: React.Dispatch<React.SetStateAction<TProjectMenuActive>>
}

export const ProjectMenuContext = createContext<TProjectMenuContext>({
   menuItemActive: undefined,
   setMenuItemActive: () => {},
})

export const useProjectMenuContext = () => useContext(ProjectMenuContext)
