import { Menu } from "@/components/Menu"
import { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    menuItems: [
      { label: "Edit", action: fn() },
      { label: "Delete", action: fn() },
      { label: "Share", action: fn() },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    menuItems: [{ label: "Settings", action: fn() }],
  },
}
