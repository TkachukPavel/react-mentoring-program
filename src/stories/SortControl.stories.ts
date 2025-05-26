import { SortControl } from "@/components/SortControl"
import { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

const meta: Meta<typeof SortControl> = {
  title: "Components/SortControl",
  component: SortControl,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SortControl>

export const Default: Story = {
  args: {
    selection: "release_date",
    onSelectionChange: fn(),
  },
}

export const SelectedTitle: Story = {
  args: {
    selection: "title",
    onSelectionChange: fn(),
  },
}
