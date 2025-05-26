import { LogoComponent } from "@/components/LogoComponent"
import { SearchForm } from "@/components/SearchForm"
import { Outlet, useNavigate, useSearchParams } from "react-router-dom"

export const SearchFormView = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query") ?? ""

  return (
    <div className="h-64 bg-cover bg-center bg-[url('@/assets/header-background.png')] relative flex flex-col">
      <Outlet />

      <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

      <div className="z-10 flex justify-between mt-5 px-16">
        <LogoComponent />

        <button
          type="button"
          onClick={() => {
            navigate("new")
          }}
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
          initialQuery={query}
          onSearch={(query) => {
            const newParams = new URLSearchParams(searchParams)
            if (query !== undefined) {
              newParams.set("query", query)
            }
            setSearchParams(newParams)
          }}
          id="search-input"
        />
      </div>
    </div>
  )
}
