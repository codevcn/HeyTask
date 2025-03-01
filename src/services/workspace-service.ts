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
            createdAt: "2025-02-28T14:23:45Z",
         },
         {
            id: 2,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Hoa cua quy",
            createdAt: "2025-02-28T14:23:45Z",
         },
         {
            id: 3,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Hoa cua quy",
            createdAt: "2025-02-26T07:10:32Z",
         },
         {
            id: 4,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Hoa cua quy",
            createdAt: "2025-02-26T07:10:32Z",
         },
         {
            id: 5,
            background: null,
            starred: false,
            title: "Blog team web app",
            createdAt: "2025-02-26T07:10:32Z",
         },
         {
            id: 6,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
            createdAt: "2025-02-27T18:45:00Z",
         },
         {
            id: 7,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
            createdAt: "2025-02-27T18:45:00Z",
         },
         {
            id: 8,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Queen never cry",
            createdAt: "2025-02-26T07:10:32Z",
         },
         {
            id: 9,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: true,
            title: "Dark",
            createdAt: "2025-02-26T07:10:32Z",
         },
         {
            id: 10,
            background:
               "https://storage.googleapis.com/a1aa/image/oxxO61vLnqcVVr5GeDnFWfDxi2doCoOqEX8rVtpu2JM.jpg",
            starred: true,
            title: "Blog team web app",
            createdAt: "2025-02-27T18:45:00Z",
         },
         {
            id: 11,
            background:
               "https://storage.googleapis.com/a1aa/image/oxxO61vLnqcVVr5GeDnFWfDxi2doCoOqEX8rVtpu2JM.jpg",
            starred: true,
            title: "Code VCN",
            createdAt: "2025-02-27T18:45:00Z",
         },
         {
            id: 12,
            background:
               "https://storage.googleapis.com/a1aa/image/rJEQslJCBLJhbRXpj1xqMqGw6TTlYN90udrcZmecvUo.jpg",
            starred: false,
            title: "Blog team web app",
            createdAt: "2025-02-27T18:45:00Z",
         },
      ]
      return data
   }
}

export const workspaceService = new WorkspaceService()
