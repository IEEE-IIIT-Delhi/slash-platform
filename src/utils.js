export async function wait (ms) {
  await new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export function log (key, value) {
  console.log(`${Date.now()}:`, `${key}:`, value)
}
