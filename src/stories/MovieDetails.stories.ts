import { Meta, StoryObj } from "@storybook/react"
import MovieDetails from "../components/MovieDetails"

const imageUrl =
  "https://s3-alpha-sig.figma.com/img/89fa/22b0/9af0f226591250d0c0dc45e952d8c0a6?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W9aPXD7XhYtCMjC1PlkVZcPjP5dVwwjLlfdTDI6CMj4p8W4UgB2UnsHS8jeJd6egMr3~zcvhQ97b-i9pHm04OBZKXHAk0sHr8YpxLOoizKQnqswqGJGriEfpS7DZS5RSpczEw5j86xsPSIzxfG9AduZkYdEqTRrFcLRBsT398wm-4OEgluyZWZqmN4RTYNa6op3acTwyCKC7LvW-FRpZDww8dUF7tRgg~GEizvL5zUw6v9GWLiB5bVhQ06NhQktIzNeSLOCx-yDg8MQyFaifAZFfDaTxJl-eykmre2N3lsoYC0HIASv-MZj5IBjk7NmRlPAejS7bydODOOpMyN7N7Q__"

const meta: Meta<typeof MovieDetails> = {
  title: "Components/MovieDetails",
  component: MovieDetails,
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
    imageUrl,
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MovieDetails>

export const Default: Story = {
  args: {
    movieName: "Pulp Fiction",
    releaseYear: 1994,
    rating: 8.9,
    duration: 154,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genres: ["Crime", "Drama"],
  },
}

export const WithLongDescription: Story = {
  args: {
    ...Default.args,
    description:
      "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
  },
}

export const WithManyGenres: Story = {
  args: {
    ...Default.args,
    genres: ["Crime", "Drama", "Thriller", "Action", "Black Comedy"],
  },
}
