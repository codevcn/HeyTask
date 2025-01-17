import { Avatar, Tooltip } from "@mui/material"
import type { TCardItemPreviewData } from "../../services/types"
import ReorderIcon from "@mui/icons-material/Reorder"

type TCardProps = {
   cardData: TCardItemPreviewData
}

const Card = ({ cardData }: TCardProps) => {
   const { id, firstMember, hasDescription, title } = cardData

   return (
      <div
         key={id}
         className="bg-[#22272B] cursor-pointer mb-2 rounded-lg py-2 px-3 pr-2 hover:outline outline-2 outline-white"
      >
         <h3 className="text-sm">{title}</h3>
         <div className="flex items-center justify-between mt-2">
            {hasDescription && (
               <Tooltip title="This card has a description." arrow>
                  <div>
                     <ReorderIcon sx={{ fontSize: 16 }} />
                  </div>
               </Tooltip>
            )}
            {firstMember && (
               <div>
                  <Tooltip title={firstMember.fullName} arrow>
                     {firstMember.avatar ? (
                        <Avatar
                           alt="User Avatar"
                           src={firstMember.avatar}
                           sx={{ height: 24, width: 24 }}
                        />
                     ) : (
                        <Avatar sx={{ height: 24, width: 24 }}>{firstMember.fullName[0]}</Avatar>
                     )}
                  </Tooltip>
               </div>
            )}
         </div>
      </div>
   )
}

type TCardsProps = {
   cards: TCardItemPreviewData[] | null
}

export const Cards = ({ cards }: TCardsProps) => {
   return (
      <div className="mt-2">
         {cards &&
            cards.length > 0 &&
            cards.map((cardData) => <Card key={cardData.id} cardData={cardData} />)}
      </div>
   )
}
