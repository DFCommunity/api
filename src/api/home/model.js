import mongoose, { Schema } from 'mongoose'

const homeSchema = new Schema({
  Title: {
    type: String
  },
  Context: {
    type: String
  },
  Version: {
    type: String
  },
  Organisation: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

homeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Title: this.Title,
      Context: this.Context,
      Version: this.Version,
      Organisation: this.Organisation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Home', homeSchema)

export const schema = model.schema
export default model
