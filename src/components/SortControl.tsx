import { useClickOutside } from "@/hooks/useClickOutside"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

type Props = {
  selection: SortOptions
  onSelectionChange: (selection: SortOptions) => void
}

type SortOptions = "Release Date" | "Title"

export const SortControl = ({ selection, onSelectionChange }: Props) => {
  const [currentSelection, setCurrentSelection] =
    useState<SortOptions>(selection)

  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const onOptionClick = (option: SortOptions) => {
    setCurrentSelection(option)
    onSelectionChange(option)
    setIsOpen(false)
  }

  return (
    <div
      className="flex text-sm"
      ref={wrapperRef}
    >
      <label
        className="font-light text-white uppercase opacity-60"
        htmlFor="sort-control"
      >
        Sort by
      </label>
      <div className="relative">
        <div
          className="flex cursor-pointer flex-row items-center justify-end"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            id="sort-control"
            type="button"
            className="ml-6 min-w-24 cursor-pointer text-right text-white uppercase"
            value={currentSelection}
          />
          {isOpen ? (
            <FaChevronUp
              title="close menu"
              className="ml-2 text-red-400"
            />
          ) : (
            <FaChevronDown
              title="open menu"
              className="ml-2 text-red-400"
            />
          )}
        </div>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute right-0 mt-2 w-full list-none rounded! bg-gray-600 text-white"
          >
            <li
              className="cursor-pointer rounded px-4 py-1 hover:bg-red-400"
              onClick={() => onOptionClick("Release Date")}
            >
              Release Date
            </li>
            <li
              className="cursor-pointer rounded px-4 py-1 hover:bg-red-400"
              onClick={() => onOptionClick("Title")}
            >
              Title
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
