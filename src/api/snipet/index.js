import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Snipet, { schema } from './model'

const router = new Router()
const { Title, Language, Body, Tags } = schema.tree

/**
 * @api {post} /snipets Create snipet
 * @apiName CreateSnipet
 * @apiGroup Snipet
 * @apiParam Title Snipet's Title.
 * @apiParam Language Snipet's Language.
 * @apiParam Body Snipet's Body.
 * @apiParam Tags Snipet's Tags.
 * @apiSuccess {Object} snipet Snipet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snipet not found.
 */
router.post('/',
  body({ Title, Language, Body, Tags }),
  create)

/**
 * @api {get} /snipets Retrieve snipets
 * @apiName RetrieveSnipets
 * @apiGroup Snipet
 * @apiUse listParams
 * @apiSuccess {Object[]} snipets List of snipets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /snipets/:id Retrieve snipet
 * @apiName RetrieveSnipet
 * @apiGroup Snipet
 * @apiSuccess {Object} snipet Snipet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snipet not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /snipets/:id Update snipet
 * @apiName UpdateSnipet
 * @apiGroup Snipet
 * @apiParam Title Snipet's Title.
 * @apiParam Language Snipet's Language.
 * @apiParam Body Snipet's Body.
 * @apiParam Tags Snipet's Tags.
 * @apiSuccess {Object} snipet Snipet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snipet not found.
 */
router.put('/:id',
  body({ Title, Language, Body, Tags }),
  update)

/**
 * @api {delete} /snipets/:id Delete snipet
 * @apiName DeleteSnipet
 * @apiGroup Snipet
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Snipet not found.
 */
router.delete('/:id',
  destroy)

export default router
