export default function formatDuration(duration?: number) {
  if (!Number.isSafeInteger(duration) || duration === undefined) {
    return ""
  }

  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}
