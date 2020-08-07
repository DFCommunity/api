import mongoose, { Schema } from 'mongoose'

const notesSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String
  },
  date: {
    type: String
  },
  about: {
    type: String
  },
  context: {
    type: String
  },
  tags: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

notesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      topic: this.topic,
      date: this.date,
      about: this.about,
      context: this.context,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Notes', notesSchema)

export const schema = model.schema
export default model
