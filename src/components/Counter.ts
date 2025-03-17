import React, { createElement } from "react"
import { ReactNode } from "react"

type Props = {
  initialValue: number
}

export class Counter extends React.Component<Props, { value: number }> {
  constructor(props: Props) {
    super(props)
    this.state = { value: props.initialValue }
  }

  increment = () => {
    this.setState({ value: this.state.value + 1 })
  }

  decrement = () => {
    this.setState({ value: this.state.value - 1 })
  }

  render(): ReactNode {
    return React.createElement(
      "div",
      { className: "flex flex-row items-center" },
      createElement(
        "button",
        {
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer",
          onClick: () => this.decrement(),
        },
        "-",
      ),
      createElement("div", { className: "text-center mx-2" }, this.state.value),
      createElement(
        "button",
        {
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer",
          onClick: () => this.increment(),
        },
        "+",
      ),
    )
  }
}
