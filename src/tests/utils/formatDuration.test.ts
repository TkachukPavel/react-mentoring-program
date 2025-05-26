import formatDuration from "@/utils/formatDuration"

describe("formatDuration", () => {
  test("should format duration of 0 minutes", () => {
    expect(formatDuration(0)).toBe("0h 0m")
  })

  test("should format duration less than an hour", () => {
    expect(formatDuration(45)).toBe("0h 45m")
  })

  test("should format duration of exactly one hour", () => {
    expect(formatDuration(60)).toBe("1h 0m")
  })

  test("should format duration of one hour and some minutes", () => {
    expect(formatDuration(75)).toBe("1h 15m")
  })

  test("should format duration of multiple hours", () => {
    expect(formatDuration(150)).toBe("2h 30m")
  })

  test("should format large durations correctly", () => {
    expect(formatDuration(543)).toBe("9h 3m")
  })

  test("returns empty string if duration is  undefined", () => {
    expect(formatDuration(undefined)).toBe("")
  })
})
