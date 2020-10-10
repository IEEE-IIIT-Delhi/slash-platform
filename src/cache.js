import dotenv from 'dotenv'
import { promisify } from 'util'
import redis from 'redis'
import mongoose from 'mongoose'

dotenv.config()

const {
  REDIS_HOST,
  REDIS_PORT
} = process.env

// redis
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: () => 1000
})

redisClient.get = promisify(redisClient.get)
const mongoExec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options) {
  this.useCache = true
  this.time = options.time
  this.key = options.key
  this.createDocument = options.createDocument
  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await mongoExec.apply(this, arguments)
  }

  const { key } = this
  const cacheValue = await redisClient.get(key)

  if (cacheValue) {
    const doc = JSON.parse(cacheValue)

    /* eslint-disable new-cap */
    if (this.createDocument) {
      return Array.isArray(doc)
        ? doc.map(d => new this.model(d))
        : new this.model(doc)
    }

    return doc
  }

  const result = await mongoExec.apply(this, arguments)

  redisClient.set(key, JSON.stringify(result))
  if (this.time) {
    redisClient.expire(key, this.time, () => {})
  }

  return result
}

export function clearKey (key) {
  redisClient.del(key)
}