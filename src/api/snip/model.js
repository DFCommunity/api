import mongoose, { Schema } from 'mongoose'

const snipSchema = new Schema({
  Creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  Title: {
    type: String
  },
  Code: {
    type: String
  },
  Lang: {
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

snipSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Creator: this.Creator.view(full),
      Title: this.Title,
      Code: this.Code,
      Lang: this.Lang,
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

const model = mongoose.model('Snip', snipSchema)

export const schema = model.schema
export default model
