import { useState, useRef, useEffect, MouseEvent } from "react"

const items: string[] = [
   "https://storage.googleapis.com/a1aa/image/FcNVUSSjEutyWOY3r4_AyYmtTgV3KLniM17sftR1t7c.jpg",
   "https://storage.googleapis.com/a1aa/image/C5ZK8iYrM8CcfRpYIE3H2Ba9FL3oLvjCVw4qBGCHipc.jpg",
   "https://storage.googleapis.com/a1aa/image/DefV6-crshU8zj5k0ux88uAqc2uqcOTkKhiLgJIbKvc.jpg",
]

type TSliderProps = {
   slides: JSX.Element[]
}

const Slider = ({ slides }: TSliderProps) => {
   const [currentIndex, setCurrentIndex] = useState(0)
   const sliderRef = useRef<HTMLDivElement>(null)
   const isDragging = useRef(false)
   const startPosition = useRef<number | null>(null)
   const currentTranslate = useRef<number>(0)
   const prevTranslate = useRef<number>(0)

   const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true
      startPosition.current = e.clientX
      if (sliderRef.current) {
         sliderRef.current.style.transition = "none"
      }
   }

   const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
      if (!isDragging.current || !startPosition.current) return

      const currentPosition = e.clientX
      currentTranslate.current = currentPosition - startPosition.current

      if (sliderRef.current) {
         sliderRef.current.style.transform = `translateX(calc(${prevTranslate.current}% + ${currentTranslate.current}px))`
      }
   }

   const handleMouseUp = () => {
      isDragging.current = false

      const moveBy = currentTranslate.current
      if (Math.abs(moveBy) > 100) {
         if (moveBy > 0) {
            setCurrentIndex((prev) => Math.max(prev - 1, 0))
         } else {
            setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))
         }
      }

      prevTranslate.current = currentIndex * -100
      if (sliderRef.current) {
         sliderRef.current.style.transition = "transform 0.3s ease"
         sliderRef.current.style.transform = `translateX(${prevTranslate.current}%)`
      }
   }

   const handleMouseLeave = () => {
      if (isDragging.current) {
         handleMouseUp()
      }
   }

   useEffect(() => {
      prevTranslate.current = currentIndex * -100
      if (sliderRef.current) {
         sliderRef.current.style.transition = "transform 0.3s ease"
         sliderRef.current.style.transform = `translateX(${prevTranslate.current}%)`
      }
   }, [currentIndex])

   return (
      <div
         className="relative w-full overflow-hidden cursor-grab"
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave}
      >
         <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out"
            onDragStart={(e) => e.preventDefault()}
         >
            {slides}
         </div>
      </div>
   )
}

const App = () => {
   return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
         <Slider
            slides={items.map((image, index) => (
               <img
                  key={index}
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-auto flex-shrink-0"
               />
            ))}
         />
      </div>
   )
}

export default App
