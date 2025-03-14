import type { Meta, StoryObj } from "@storybook/react"
import MovieTile from "../components/MovieTile"
import { fn } from "@storybook/test"

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

const imageUrl =
  "https://s3-alpha-sig.figma.com/img/89fa/22b0/9af0f226591250d0c0dc45e952d8c0a6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W9aPXD7XhYtCMjC1PlkVZcPjP5dVwwjLlfdTDI6CMj4p8W4UgB2UnsHS8jeJd6egMr3~zcvhQ97b-i9pHm04OBZKXHAk0sHr8YpxLOoizKQnqswqGJGriEfpS7DZS5RSpczEw5j86xsPSIzxfG9AduZkYdEqTRrFcLRBsT398wm-4OEgluyZWZqmN4RTYNa6op3acTwyCKC7LvW-FRpZDww8dUF7tRgg~GEizvL5zUw6v9GWLiB5bVhQ06NhQktIzNeSLOCx-yDg8MQyFaifAZFfDaTxJl-eykmre2N3lsoYC0HIASv-MZj5IBjk7NmRlPAejS7bydODOOpMyN7N7Q__"

export const Default: Story = {
  args: {
    imageUrl: imageUrl,
    movieName: "Pulp Fiction",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
  },
}

export const WithLongTitle: Story = {
  args: {
    imageUrl: imageUrl,
    movieName: "The Shawshank Redemption: Extended Director's Cut",
    releaseYear: 1994,
    genres: ["Drama", "Crime"],
  },
}

export const MultipleGenres: Story = {
  args: {
    imageUrl: imageUrl,
    movieName: "Inception",
    releaseYear: 2010,
    genres: [
      "Action",
      "Sci-Fi",
      "Thriller",
      "Adventure",
      "Drama",
      "Mystery",
      "Fantasy",
      "Crime",
      "Romance",
    ],
  },
}
