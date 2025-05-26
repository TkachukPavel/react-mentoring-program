import { FocusTrap } from "focus-trap-react"
import { createPortal } from "react-dom"
import { IoIosClose } from "react-icons/io"

export const Dialog = (props: {
  title?: string
  onClose: () => void
  children?: React.ReactNode
}) => {
  return createPortal(
    <>
      <FocusTrap>
        <div className="bg-neutral-800 absolute top-1/2 left-1/2 -translate-1/2 z-70">
          <div className="flex justify-end w-full ">
            <button
              type="button"
              className="text-white cursor-pointer"
              onClick={props.onClose}>
              <IoIosClose size="55" />
            </button>
          </div>
          <div className="flex flex-col px-12 pb-12">
            {props.title && (
              <div className="w-full uppercase text-white text-3xl tracking-wide font-light font-montserrat">
                {props.title}
              </div>
            )}
            {props.children}
          </div>
        </div>
      </FocusTrap>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={props.onClose}
      />
    </>,
    document.body,
  )
}
