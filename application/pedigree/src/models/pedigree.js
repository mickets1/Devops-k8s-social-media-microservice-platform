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
      min: 1,
    },
    lits: [
      {
        userId: {
          type: String,
          required: true,
        },
        litId: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          requires: true,
          trim: true,
          minlength: 1,
        },
        date: {
          type: Date,
          default: Date.now,
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
export const Pedigree = mongoose.model('Pedigree', schema)

// // // Create a schema.
// // const schema = new mongoose.Schema({
// //   userId: {
// //     type: Number,
// //     required: true,
// //     min: 1
// //   },
// //   lits: [
// //     {
// //       // userId: {
// //       //   type: Number,
// //       //   required: true
// //       // },
// //       // litId: {
// //       //   type: Number,
// //       //   required: true
// //       // },
// //       description: {
// //         type: String,
// //         requires: true,
// //         trim: true,
// //         minlength: 1
// //       },
// //       date: {
// //         type: Date,
// //         default: Date.now
// //       }
// //     }
// //   ]
// // }, {
// //   timestamps: true,
// //   toObject: {
// //     virtuals: true, // ensure virtual fields are serialized
// //     /**
// //      * Performs a transformation of the resulting object to remove sensitive information.
// //      *
// //      * @param {object} doc - The mongoose document which is being converted.
// //      * @param {object} ret - The plain object representation which has been converted.
// //      */
// //     transform: function (doc, ret) {
// //       delete ret._id
// //       delete ret.__v
// //     }
// //   }
// // })

// // schema.virtual('id').get(function () {
// //   return this._id.toHexString()
// // })

// // // Create a model using the schema.
// // export const Pedigree = mongoose.model('Pedigree', schema)
