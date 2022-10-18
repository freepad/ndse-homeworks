import * as dotenv from 'dotenv'

dotenv.config()

export default {
  WEATHERSTACK_API_KEY: process.env.WEATHERSTACK_KEY,
}
