import fetch from 'node-fetch'

export async function wait (ms) {
  await new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export function log (key, value) {
  console.log(`${Date.now()}:`, `${key}:`, value)
}

export async function getGeoInfo (req) {
  const ip = req.headers['x-real-ip']
  const res = await fetch(`http://ip-api.com/json/${ip}?fields=17`)
  return await res.json()
}
