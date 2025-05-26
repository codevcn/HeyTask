import { useState } from "react"

const quotes: TQuote[] = [
  { id: 1, quote: "The only limit to our realization of tomorrow is our doubts of today." },
  { id: 2, quote: "Do what you can, with what you have, where you are." },
  { id: 3, quote: "Success is not the key to happiness. Happiness is the key to success." },
]

type TQuote = { id: number; quote: string }

export default function QuoteSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text
    return text.split(new RegExp(`(${keyword})`, "gi")).map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="bg-blue-300">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const filteredQuotes = quotes.filter((q) =>
    q.quote.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Tìm kiếm quote..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredQuotes.map((q) => (
          <li key={q.id} className="mb-2">
            {highlightText(q.quote, searchTerm)}
          </li>
        ))}
      </ul>
    </div>
  )
}
