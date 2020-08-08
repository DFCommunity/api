import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Snip, { schema } from './model'

const router = new Router()
const { Title, Code, Lang, Tags } = schema.tree

/**
 * @api {post} /snipet Create snip
 * @apiName CreateSnip
 * @apiGroup Snip
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Title Snip's Title.
 * @apiParam Code Snip's Code.
 * @apiParam Lang Snip's Lang.
 * @apiParam Tags Snip's Tags.
 * @apiSuccess {Object} snip Snip's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snip not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ Title, Code, Lang, Tags }),
  create)

/**
 * @api {get} /snipet Retrieve snips
 * @apiName RetrieveSnips
 * @apiGroup Snip
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of snips.
 * @apiSuccess {Object[]} rows List of snips.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /snipet/:id Retrieve snip
 * @apiName RetrieveSnip
 * @apiGroup Snip
 * @apiSuccess {Object} snip Snip's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snip not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /snipet/:id Update snip
 * @apiName UpdateSnip
 * @apiGroup Snip
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam Title Snip's Title.
 * @apiParam Code Snip's Code.
 * @apiParam Lang Snip's Lang.
 * @apiParam Tags Snip's Tags.
 * @apiSuccess {Object} snip Snip's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Snip not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ Title, Code, Lang, Tags }),
  update)

/**
 * @api {delete} /snipet/:id Delete snip
 * @apiName DeleteSnip
 * @apiGroup Snip
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Snip not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
