import { GenreSelect } from "@/components/GenreSelect"
import { SearchForm } from "@/components/SearchForm"
import { SortControl } from "@/components/SortControl"
import { genres } from "@/data/genres"
export const MovieListPage = () => {
  const handleSearch = (query: string) => {
    console.log(query)
  }

  return (
    <>
      <div className="bg-neutral-800 h-screen">
        <div className="h-64 bg-cover bg-center bg-[url('@/assets/header-background.png')] relative flex flex-col">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

          <div className="z-10 flex justify-between mt-5 px-16">
            <button className="text-red-400 font-montserrat cursor-pointer">
              <span className="font-extrabold">netflix</span>
              <span className="font-medium">roulette</span>
            </button>

            <button
              type="button"
              className="uppercase rounded text-xl px-5 py-2.5 bg-neutral-500/65 font-montserrat cursor-pointer text-red-400 font-bold ">
              + Add movie
            </button>
          </div>
          <div
            className="
         relative z-10 p-4  self-center ">
            <label
              htmlFor="search-input"
              className="uppercase font-montserrat   text-white font-light text-5xl">
              FIND YOUR MOVIE
            </label>
            <SearchForm
              className="mt-8"
              initialQuery=""
              onSearch={handleSearch}
              id="search-input"
            />
          </div>
        </div>
        <div className="mt-6 mx-16 flex justify-between border-b-2 border-neutral-700 ">
          <GenreSelect
            genres={genres}
            className="-mb-0.5"
            selectedGenre={"All"}
            onSelect={(genre) => {
              console.log(genre)
            }}
          />
          <SortControl
            selection="Title"
            onSelectionChange={() => {}}
          />
        </div>
      </div>
    </>
  )
}
