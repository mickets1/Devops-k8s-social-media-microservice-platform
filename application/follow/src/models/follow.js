/**
 * Mongoose model Task.
 *
 * @author Mats Loock
 * @version 2.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      minlength: 1,
    },
    followers: [
      {
        userIdFollower: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true, // ensure virtual fields are serialized
      /**
       * Performs a transformation of the resulting object to remove sensitive information.
       *
       * @param {object} doc - The mongoose document which is being converted.
       * @param {object} ret - The plain object representation which has been converted.
       */
      transform: function (doc, ret) {
        delete ret._id
        delete ret.__v
      },
    },
  }
)

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const Follow = mongoose.model('Follow', schema)
