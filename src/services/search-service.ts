import { perfomDelay } from "../utils/helpers"
import type { TGeneralSearchData } from "./types"

const generalSearchData: TGeneralSearchData = {
   projects: [
      {
         id: 1,
         title: "Project Management App",
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1703/6f971f0ef48c1a5f2cde86f2d3a9ab56/photo-1736297150541-89378f055b96.webp",
      },
      {
         id: 2,
         title: "E-commerce Platform",
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1703/6f971f0ef48c1a5f2cde86f2d3a9ab56/photo-1736297150541-89378f055b96.webp",
      },
      {
         id: 3,
         title: "Social Media Dashboard",
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2401x1600/ceca11e134be93c2bf61b61bd285fc6f/photo-1691929601779-ead6aeb78d1b.jpg",
      },
   ],
   phases: [
      { id: 1, title: "Planning", project: { title: "Project Management App", id: 1 } },
      { id: 2, title: "Development", project: { title: "Project Management App", id: 1 } },
      { id: 3, title: "Testing", project: { title: "Project Management App", id: 1 } },
      { id: 4, title: "Design", project: { title: "E-commerce Platform", id: 2 } },
      { id: 5, title: "Deployment", project: { title: "Social Media Dashboard", id: 2 } },
   ],
   tasks: [
      {
         id: 1,
         title: "Setup Database",
         project: { title: "Project Management App", id: 1 },
         phase: { title: "Planning", id: 2 },
      },
      {
         id: 2,
         title: "Design UI Components",
         project: { title: "Project Management App", id: 1 },
         phase: { title: "Development", id: 4 },
      },
      {
         id: 3,
         title: "Fix Login Bugs",
         project: { title: "Project Management App", id: 1 },
         phase: { title: "Testing", id: 5 },
      },
      {
         id: 4,
         title: "Create Product Listing Page",
         project: { title: "E-commerce Platform", id: 1 },
         phase: { title: "Design", id: 1 },
      },
      {
         id: 5,
         title: "Optimize Checkout Process",
         project: { title: "E-commerce Platform", id: 2 },
         phase: { title: "Development", id: 5 },
      },
      {
         id: 6,
         title: "Deploy to Production",
         project: { title: "Social Media Dashboard", id: 2 },
         phase: { title: "Deployment", id: 1 },
      },
   ],
}

class SearchService {
   async generalSearch(keyword: string): Promise<TGeneralSearchData> {
      await perfomDelay(1000)
      return generalSearchData
   }
}

export const searchService = new SearchService()
