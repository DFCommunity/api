import mongoose, { Schema } from 'mongoose'

const contactusSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  service: {
    type: String
  },
  message: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

contactusSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
      service: this.service,
      message: this.message,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Contactus', contactusSchema)

export const schema = model.schema
export default model
