import { useClickOutside } from "@/hooks/useClickOutside"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export type SortOptions = "release_date" | "title"

export const SortControl = (props: {
  selection: SortOptions
  onSelectionChange: (selection: SortOptions) => void
}) => {
  const [currentSelection, setCurrentSelection] = useState<SortOptions>(
    props.selection,
  )

  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const onOptionClick = (option: SortOptions) => {
    setCurrentSelection(option)
    props.onSelectionChange(option)
    setIsOpen(false)
  }

  return (
    <div
      data-testid="sort-control"
      className="flex text-sm"
      ref={wrapperRef}>
      <label
        className="font-light text-white uppercase opacity-60"
        htmlFor="sort-control">
        Sort by
      </label>
      <div className="relative">
        <div
          className="flex cursor-pointer flex-row items-center justify-end"
          onClick={() => setIsOpen(!isOpen)}>
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
            className="absolute z-10 right-0 mt-2 w-full list-none rounded! bg-neutral-800 py-1 text-white">
            <li
              className="cursor-pointer px-4 hover:bg-red-400"
              onClick={() => onOptionClick("release_date")}>
              Release Date
            </li>
            <li
              className="cursor-pointer px-4 hover:bg-red-400"
              onClick={() => onOptionClick("title")}>
              Title
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
