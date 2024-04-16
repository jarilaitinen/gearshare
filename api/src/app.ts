import express from 'express'
import cors from 'cors'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())

// Set up routers

console.log('=========================')
console.log('app file is running smoothly')

// Custom API error handler
app.use(apiErrorHandler)

export default app