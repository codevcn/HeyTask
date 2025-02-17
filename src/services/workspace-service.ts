import { perfomDelay } from "../utils/helpers"
import { TProjectPreviewData } from "./types"

class WorkspaceService {
   async getProjects(): Promise<TProjectPreviewData[]> {
      await perfomDelay(1000)
      const data: TProjectPreviewData[] = [
         {
            id: 1,
            background: null,
            starred: false,
            title: "Blog team web app",
         },
         {
            id: 2,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Hoa cua quy",
         },
         {
            id: 3,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Hoa cua quy",
         },
         {
            id: 4,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Hoa cua quy",
         },
         {
            id: 5,
            background: null,
            starred: false,
            title: "Blog team web app",
         },
         {
            id: 6,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
         },
         {
            id: 7,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
         },
         {
            id: 8,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
         },
         {
            id: 9,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Dark",
         },
         {
            id: 10,
            background:
               "https://storage.googleapis.com/a1aa/image/oxxO61vLnqcVVr5GeDnFWfDxi2doCoOqEX8rVtpu2JM.jpg",
            starred: true,
            title: "Blog team web app",
         },
         {
            id: 11,
            background:
               "https://storage.googleapis.com/a1aa/image/oxxO61vLnqcVVr5GeDnFWfDxi2doCoOqEX8rVtpu2JM.jpg",
            starred: true,
            title: "Code VCN",
         },
         {
            id: 12,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Blog team web app",
         },
      ]
      return data
   }
}

export const workspaceService = new WorkspaceService()
