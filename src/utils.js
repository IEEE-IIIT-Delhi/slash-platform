import { createHash } from 'crypto'
import fetch from 'node-fetch'
import Log from '../models/log'

export async function wait (ms) {
  await new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export function log (type, key, value) {
  Log.create({ type, key, value })
  console.log('%d: [%s] %s: %s', Date.now(), type, key, value)
}

export async function getGeoInfo (req) {
  const ip = req.headers['x-real-ip']
  const res = await fetch(`http://ip-api.com/json/${ip}?fields=17`)
  return await res.json()
}

export function hash (string) {
  return createHash('sha1').update(string).digest('hex')
}
