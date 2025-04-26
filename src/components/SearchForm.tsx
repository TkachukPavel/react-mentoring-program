import { useState } from "react"

export const SearchForm = (props: {
  initialQuery: string
  onSearch: (query: string) => void
  id?: string
  className?: string
}) => {
  const [query, setQuery] = useState(props.initialQuery)

  return (
    <div className={`flex flex-row ${props.className}`}>
      <input
        className="mr-3 w-3xl rounded bg-neutral-800 px-4 py-4 font-montserrat text-white opacity-90"
        aria-label="Search"
        type="text"
        placeholder="What do you want to watch?"
        value={query}
        id={props.id}
        onFocus={() => props.onSearch(query)}
        onKeyDown={(e) => e.key === "Enter" && props.onSearch(query)}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={() => props.onSearch(query)}
        className="ml-0.5 rounded bg-red-400 px-[4rem] py-4 text-white uppercase outline-0 hover:cursor-pointer hover:bg-red-500 focus-visible:outline-0">
        Search
      </button>
    </div>
  )
}
