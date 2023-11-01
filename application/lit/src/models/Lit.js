import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, {
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
    }
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const Lit = mongoose.model('Lit', schema)
