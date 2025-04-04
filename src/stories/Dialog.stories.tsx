import type { Meta, StoryObj } from "@storybook/react"
import { Dialog } from "@/components/Dialog"
import { fn } from "@storybook/test"
import { useState } from "react"
import { MovieForm } from "@/components/MovieForm"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    onClose: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof Dialog>

const Template = (props: {
  title?: string
  onClose: () => void
  children?: React.ReactNode
}) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <button
        className="rounded bg-red-400 cursor-pointer px-4 py-2 font-montserrat text-white"
        onClick={() => setShowDialog(!showDialog)}>
        Toggle
      </button>

      {showDialog && (
        <Dialog
          title={props.title}
          onClose={() => {
            props.onClose()
            setShowDialog(false)
          }}>
          {props.children}
        </Dialog>
      )}
    </>
  )
}

export const Default: Story = {
  render: (args) => (
    <Template {...args}>
      <div className="text-white font-montserrat text-">Content goes here</div>
    </Template>
  ),
}

export const WithTitle: Story = {
  args: {
    title: "Dialog Title",
  },

  render: (args) => (
    <Template {...args}>
      <div className="text-white font-montserrat text-">Content goes here</div>
    </Template>
  ),
}

export const DeleteMovieDialog: Story = {
  args: {
    title: "Delete Movie",
  },

  render: (args) => (
    <Template {...args}>
      <div className="text-white mt-8 font-montserrat">
        Are you sure you want to delete this movie?
      </div>
      <div className="flex justify-end font-montserrat">
        <button
          type="button"
          onClick={args.onClose}
          className="rounded mt-10 bg-red-400 uppercase text-white py-3 px-7 cursor-pointer hover:bg-red-500">
          confirm
        </button>
      </div>
    </Template>
  ),
}

export const AddMovieDialog: Story = {
  args: {
    title: "Add Movie",
  },
  render: (args) => (
    <Template {...args}>
      <MovieForm
        onSubmit={() => {}}
        className="mt-9"
      />
    </Template>
  ),
}

export const EditMovieDialog: Story = {
  args: {
    title: "Edit Movie",
  },
  render: (args) => (
    <Template {...args}>
      <MovieForm
        onSubmit={() => {}}
        className="mt-9"
      />
    </Template>
  ),
}
