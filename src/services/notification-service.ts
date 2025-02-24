import { perfomDelay } from "../utils/helpers"
import { TSuccess } from "../utils/types"
import type { TFetchNotificationsData, TNotificationData } from "./types"

const notifications: TNotificationData[] = [
   {
      id: 1,
      description: "Hoa Ho wants to join the Workspace Personal CodeVCN.",
      timestamp: "2025-02-06T17:41:00Z",
      seen: false,
   },
   {
      id: 2,
      description: "Reminder: Was due Feb 5, 2025, 3:16 PM",
      timestamp: "2025-02-04T15:16:00Z",
      seen: false,
   },
   {
      id: 3,
      description: "A new system update is available. Please restart your app.",
      timestamp: "2025-02-07T08:30:00Z",
      seen: true,
   },
   {
      id: 4,
      description: "Don't forget to submit your project report before the deadline.",
      timestamp: "2025-02-06T12:00:00Z",
      seen: false,
   },
]

class NotificationService {
   async fetchNotifications(): Promise<TFetchNotificationsData> {
      await perfomDelay(1000)
      return {
         notifications: notifications,
      }
   }

   async updateNotification(updatesPayload: Partial<TNotificationData>): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async markAllAsRead(): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async loadMoreNotifications(lastId: number): Promise<TFetchNotificationsData> {
      await perfomDelay(1000)
      return {
         notifications: notifications.map((obj) => ({
            ...obj,
            id:
               Math.random() +
               Math.random() +
               Math.random() +
               Math.random() +
               Math.random() +
               Math.random(),
         })),
      }
   }
}

export const notificationService = new NotificationService()
