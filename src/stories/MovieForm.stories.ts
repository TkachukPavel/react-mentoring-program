import { MovieForm } from "@/components/MovieForm"
import { movie } from "@/mocks/movie.mock"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof MovieForm> = {
  title: "Components/MovieForm",
  component: MovieForm,
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

type Story = StoryObj<typeof MovieForm>

export const AddMode: Story = {}

export const EditMode: Story = {
  args: {
    movie,
  },
}
