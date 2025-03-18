import { useState } from "react"
import { FaEllipsisV } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"

type MenuItem = {
  label: string
  action: () => void
}

type Props = {
  menuItems: MenuItem[]
  className?: string
}

export const Menu = ({ menuItems, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <div className="relative">
        {!isOpen ? (
          <button
            type="button"
            className="cursor-pointer rounded-full bg-neutral-800 p-2 text-[10px] text-white"
            onClick={() => setIsOpen(true)}
          >
            <FaEllipsisV title="open menu" />
          </button>
        ) : (
          <div className="absolute top-0 right-0 w-38 rounded bg-neutral-800 py-2 text-white">
            <div className="flex justify-items-end">
              <button
                type="button"
                className="mr-2 ml-auto cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <FaXmark title="close menu" />
              </button>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full cursor-pointer py-1 pl-4 text-left hover:bg-red-400"
                onClick={() => {
                  item.action()
                  setIsOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
