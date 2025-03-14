import "./App.css"
import Counter from "./components/Counter"
import GenreSelect from "./components/GenreSelect"
import SearchForm from "./components/SearchForm"
import { genres } from "./data/genres"

function App() {
  return (
    <div className="flex h-100 flex-col items-center justify-center font-montserrat">
      <div className="mb-3">
        <Counter initialValue={0} />
      </div>
      <div className="mb-3">
        <SearchForm
          initialQuery=""
          onSearch={(query) => console.log(query)}
        />
      </div>
      <div className="mb-3 bg-gray-700">
        <GenreSelect
          genres={genres}
          selectedGenre="All"
          onSelect={(genre) => console.log(genre)}
        ></GenreSelect>
      </div>
    </div>
  )
}

export default App
