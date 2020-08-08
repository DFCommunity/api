import mongoose, { Schema } from 'mongoose'

const homeSchema = new Schema({
  Title: {
    type: String
  },
  Discription: {
    type: String
  },
  Tags: {
    type: String
  },
  Build: {
    type: String
  },
  Creator: {
    type: String
  },
  Docs: {
    type: String
  },
  Org: {
    type: String
  },
  OrgWebsite: {
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
  view(full) {
    const view = {
      // simple view
      // id: this.id,
      Title: this.Title,
      Discription: this.Discription,
      Tags: this.Tags,
      Build: this.Build,
      Creator: this.Creator,
      Docs: this.Docs,
      Org: this.Org,
      OrgWebsite: this.OrgWebsite,
      // createdAt: this.createdAt,
      // updatedAt: this.updatedAt
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
