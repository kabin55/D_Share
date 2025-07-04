import mongoose from 'mongoose'

const connectToDB = async () => {
  try {
    const url = process.env.MONGO_URL
    await mongoose.connect(url)
    console.log('Connected to database')
  } catch (error) {
    console.log(`error connecting to database ${error.message}`)
  }
}
export default connectToDB
