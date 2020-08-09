import { success, notFound } from '../../services/response/'
import { Snipet } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Snipet.create(body)
    .then((snipet) => snipet.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Snipet.find(query, select, cursor)
    .then((snipets) => snipets.map((snipet) => snipet.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Snipet.findById(params.id)
    .then(notFound(res))
    .then((snipet) => snipet ? snipet.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Snipet.findById(params.id)
    .then(notFound(res))
    .then((snipet) => snipet ? Object.assign(snipet, body).save() : null)
    .then((snipet) => snipet ? snipet.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Snipet.findById(params.id)
    .then(notFound(res))
    .then((snipet) => snipet ? snipet.remove() : null)
    .then(success(res, 204))
    .catch(next)
