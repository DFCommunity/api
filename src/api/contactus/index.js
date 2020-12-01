import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Contactus, { schema } from './model'

const router = new Router()
const { name, email, service, message } = schema.tree

/**
 * @api {post} /contactform Create contactus
 * @apiName CreateContactus
 * @apiGroup Contactus
 * @apiParam name Contactus's name.
 * @apiParam email Contactus's email.
 * @apiParam service Contactus's service.
 * @apiParam message Contactus's message.
 * @apiSuccess {Object} contactus Contactus's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contactus not found.
 */
router.post('/',
  body({ name, email, service, message }),
  create)

/**
 * @api {get} /contactform Retrieve contactuses
 * @apiName RetrieveContactuses
 * @apiGroup Contactus
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of contactuses.
 * @apiSuccess {Object[]} rows List of contactuses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /contactform/:id Retrieve contactus
 * @apiName RetrieveContactus
 * @apiGroup Contactus
 * @apiSuccess {Object} contactus Contactus's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Contactus not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /contactform/:id Delete contactus
 * @apiName DeleteContactus
 * @apiGroup Contactus
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Contactus not found.
 */
router.delete('/:id',
  destroy)

export default router
