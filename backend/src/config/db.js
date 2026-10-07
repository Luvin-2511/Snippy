import mongoose from 'mongoose'
import CONFIG from './config.js'

export async function connectToDB () {
  try {
    await mongoose.connect(CONFIG.MONGO_URI)
    console.log('Successfully connected to DB !')
  } catch (error) {
    throw new Error('Failed to connect to Database !')
  }
}
