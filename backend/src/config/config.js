import 'dotenv/config'

if (!process.env.PORT) {
  throw new Error('PORT is not found in dotenv')
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not found in dotenv')
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not found in dotenv')
}

if (!process.env.CLIENT_ID) {
  throw new Error('CLIENT_ID is not found in dotenv')
}

if (!process.env.CLIENT_SECRET) {
  throw new Error('CLIENT_SECRET is not found in dotenv')
}

if (!process.env.REFRESH_TOKEN) {
  throw new Error('REFRESH_TOKEN is not found in dotenv')
}

if (!process.env.EMAIL_USER) {
  throw new Error('EMAIL_USER is not found in dotenv')
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error('IMAGEKIT_PRIVATE_KEY is not found in dotenv')
}

const CONFIG = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  EMAIL_USER: process.env.EMAIL_USER,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}

export default CONFIG
