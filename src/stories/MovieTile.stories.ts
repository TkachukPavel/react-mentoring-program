import type { Meta, StoryObj } from "@storybook/react"
import { MovieTile } from "@/components/MovieTile"
import { fn } from "@storybook/test"
import { movie } from "@/mocks/movie.mock"

const meta: Meta<typeof MovieTile> = {
  title: "Components/MovieTile",
  component: MovieTile,
  tags: ["autodocs"],
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
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof MovieTile>

export const Default: Story = {
  args: {
    movie,
  },
}

export const WithLongTitle: Story = {
  args: {
    movie: {
      ...movie,
      title: "The Shawshank Redemption: Extended Director's Cut",
    },
  },
}

export const MultipleGenres: Story = {
  args: {
    movie: {
      ...movie,
      genres: ["Action", "Drama", "Comedy", "Thriller", "Romance", "Sci-Fi"],
    },
  },
}
