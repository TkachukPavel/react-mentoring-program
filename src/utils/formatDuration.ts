export default function formatDuration(duration?: number) {
  if (duration === undefined || duration === null) {
    return ""
  }

  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}
