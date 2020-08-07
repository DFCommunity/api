import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Notes } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Notes.create({ ...body, author: user })
    .then((notes) => notes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Notes.count(query)
    .then(count => Notes.find(query, select, cursor)
      .populate('author')
      .then((notes) => ({
        count,
        rows: notes.map((notes) => notes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Notes.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((notes) => notes ? notes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Notes.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((notes) => notes ? Object.assign(notes, body).save() : null)
    .then((notes) => notes ? notes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Notes.findById(params.id)
    .then(notFound(res))
    .then((notes) => notes ? notes.remove() : null)
    .then(success(res, 204))
    .catch(next)
