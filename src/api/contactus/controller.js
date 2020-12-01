import { success, notFound } from '../../services/response/'
import { Contactus } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Contactus.create(body)
    .then((contactus) => contactus.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Contactus.count(query)
    .then(count => Contactus.find(query, select, cursor)
      .then((contactuses) => ({
        count,
        rows: contactuses.map((contactus) => contactus.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Contactus.findById(params.id)
    .then(notFound(res))
    .then((contactus) => contactus ? contactus.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Contactus.findById(params.id)
    .then(notFound(res))
    .then((contactus) => contactus ? contactus.remove() : null)
    .then(success(res, 204))
    .catch(next)
