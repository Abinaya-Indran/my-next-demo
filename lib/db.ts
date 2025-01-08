// lib/db.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI

export async function connectToDatabase() {
  const databaseStatus = mongoose.connection.readyState

  if (databaseStatus === 1) {
    console.log('MongoDB connected!')
  }

  try {
    await mongoose.connect(MONGO_URI!, {
      dbName: 'NextJSAPI',
      bufferCommands: true
    })
  } catch (error) {
    console.log(error)
  }
}
