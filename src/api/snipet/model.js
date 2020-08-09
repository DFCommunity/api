import mongoose, { Schema } from 'mongoose'

const snipetSchema = new Schema({
  Title: {
    type: String
  },
  Language: {
    type: String
  },
  Body: {
    type: String
  },
  Tags: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

snipetSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Title: this.Title,
      Language: this.Language,
      Body: this.Body,
      Tags: this.Tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Snipet', snipetSchema)

export const schema = model.schema
export default model
