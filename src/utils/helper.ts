export function getRandomInteger(a: number, b: number): number {
  // Ensure a is less than or equal to b
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  // Generate random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function sawTooth(prevT: number, t: number, period: number, amplitude: number) {
  const normalizedTime = (prevT + t) % period
  const sawToothValue = normalizedTime % amplitude
  return sawToothValue
}

export function reverseSawTooth(prevT: number, t: number, period: number, amplitude: number) {
  const normalizedTime = (prevT + t) % period
  const sawToothValue = normalizedTime % amplitude
  return sawToothValue
}
