import { MainBoard } from "./MainBoard"
import { LeftSideNavigation } from "./LeftSideNavigation"
import { TopNavigation } from "../TopNavigation"
import { Background } from "../../components/Background"

const ProjectPage = () => {
   return (
      <div className="h-screen bg-gradient-to-b from-[#7B61FF] to-[#FF61A6]">
         <TopNavigation />
         <Background>
            <section className="flex h-full">
               <LeftSideNavigation />
               <MainBoard />
            </section>
         </Background>
      </div>
   )
}

export default ProjectPage
