import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Snip } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Snip.create({ ...body, Creator: user })
    .then((snip) => snip.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Snip.count(query)
    .then(count => Snip.find(query, select, cursor)
      .populate('Creator')
      .then((snips) => ({
        count,
        rows: snips.map((snip) => snip.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Snip.findById(params.id)
    .populate('Creator')
    .then(notFound(res))
    .then((snip) => snip ? snip.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Snip.findById(params.id)
    .populate('Creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'Creator'))
    .then((snip) => snip ? Object.assign(snip, body).save() : null)
    .then((snip) => snip ? snip.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Snip.findById(params.id)
    .then(notFound(res))
    .then((snip) => snip ? snip.remove() : null)
    .then(success(res, 204))
    .catch(next)
