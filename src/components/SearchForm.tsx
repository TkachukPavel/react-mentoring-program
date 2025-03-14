import { useState } from "react"

type Props = {
  initialQuery: string
  onSearch: (query: string) => void
}

export default function SearchForm({ initialQuery, onSearch }: Props) {
  const [query, setQuery] = useState(initialQuery)

  return (
    <>
      <div className="flex flex-row">
        <input
          className="mr-3 min-w-3xl rounded bg-gray-500 px-4 py-4 text-white opacity-50"
          aria-label="Search"
          type="text"
          placeholder="What do you want to watch?"
          value={query}
          onFocus={() => onSearch(query)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={() => onSearch(query)}
          className="ml-0.5 rounded bg-red-400 px-[4rem] py-4 text-white uppercase outline-0 hover:cursor-pointer hover:bg-red-500 focus-visible:outline-0"
        >
          Search
        </button>
      </div>
    </>
  )
}
