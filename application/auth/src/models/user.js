/**
 * Mongoose model Task.
 *
 * @author Mats Loock
 * @version 2.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
    // unique: true,
  },
  email: {
    type: String,
    required: true
    // unique: true,
  },
  password: {
    type: String,
    required: true
  }
})

// Create a model using the schema.
const userModel = mongoose.model('User', UserSchema)

export default userModel
