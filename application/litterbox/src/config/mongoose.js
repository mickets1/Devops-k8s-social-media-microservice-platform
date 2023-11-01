import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async () => {
  const { connection } = mongoose

  // Bind connection to events (to get notifications).
  connection.on('connected', () => console.log('MongoDB connection opened.'))
  connection.on('error', (err) =>
    console.error(`MongoDB connection error occurred: ${err}`)
  )
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  // If the Node.js process ends, close the connection.
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('MongoDB disconnected due to application termination.')
      process.exit(0)
    })
  })
  //! check if the connection
  // TODO: Change the connection string to your own.
  const url =
    'mongodb://maria:abc123@mongo-mongodb-0.mongo-mongodb-headless.default.svc.cluster.local:27017,mongo-mongodb-1.mongo-mongodb-headless.default.svc.cluster.local:27017/my-database'
  // const urlDev = process.env.DB_CONNECTION_STRING

  const options = {
    readPreference: 'secondary'
  }

  // Connect to the server.
  return mongoose.connect(url, options)
}
