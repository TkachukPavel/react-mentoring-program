import type { Meta, StoryObj } from "@storybook/react"
import SearchForm from "@/components/SearchForm"
import { fn } from "@storybook/test"

const meta = {
  title: "Components/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "centered",
  },
  args: {
    onSearch: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof SearchForm>

export const Default: Story = {
  args: {
    initialQuery: "",
  },
}

export const WithInitialQuery: Story = {
  args: {
    initialQuery: "Inception",
  },
}
