import type { Meta, StoryObj } from "@storybook/react"
import GenreSelect from "../components/GenreSelect"
import { genres } from "../data/genres"
import { fn } from "@storybook/test"

// filepath: /Users/paveltkachuk/react-mentoring-program/src/stories/GenreSelect.stories.ts

const meta: Meta<typeof GenreSelect> = {
  title: "Components/GenreSelect",
  component: GenreSelect,
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
  args: {
    onSelect: fn(),
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof GenreSelect>

export const Default: Story = {
  args: {
    genres,
    selectedGenre: "All",
  },
}

export const WithSelectedGenre: Story = {
  args: {
    genres,
    selectedGenre: "Comedy",
  },
}

export const SingleGenre: Story = {
  args: {
    genres: ["Comedy"],
    selectedGenre: "Comedy",
  },
}
