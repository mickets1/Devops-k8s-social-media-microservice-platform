import express from 'express'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import { connectRabbitmq } from './utils/rabbitmq.js'
import cors from 'cors'

try {
  // Connect to MongoDB.
  await connectDB()
  await connectRabbitmq()

  // Creates an Express application.
  const app = express()
  app.use(cors())

  // Get the directory name of this module's path.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))

  // Serve static files.
  app.use(express.static(join(directoryFullName, '..', 'public')))

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }

  // Use JSON parser for all routes
  app.use((req, res, next) => {
    express.json()(req, res, next)
  })

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    // 404 Not Found.
    if (err.status === 404) {
      return res.status(404).json({ Error: '404 not found :(' })
    }

    // 500 Internal Server Error (in production, all other errors send this response).
    if (req.app.get('env') !== 'development') {
      console.log(err)
      return res.status(500).json({ Error: 'Sorry an error happened :(' })
    }

    // Development only!
    // Only providing detailed error in development.

    // Render the error page.
    res.status(err.status || 500).json({ Error: 'Sorry an error happened :(' })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
