import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Notes, { schema } from './model'

const router = new Router()
const { topic, date, about, context, tags } = schema.tree

/**
 * @api {post} /notes Create notes
 * @apiName CreateNotes
 * @apiGroup Notes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam topic Notes's topic.
 * @apiParam date Notes's date.
 * @apiParam about Notes's about.
 * @apiParam context Notes's context.
 * @apiParam tags Notes's tags.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ topic, date, about, context, tags }),
  create)

/**
 * @api {get} /notes Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notes.
 * @apiSuccess {Object[]} rows List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /notes/:id Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /notes/:id Update notes
 * @apiName UpdateNotes
 * @apiGroup Notes
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam topic Notes's topic.
 * @apiParam date Notes's date.
 * @apiParam about Notes's about.
 * @apiParam context Notes's context.
 * @apiParam tags Notes's tags.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ topic, date, about, context, tags }),
  update)

/**
 * @api {delete} /notes/:id Delete notes
 * @apiName DeleteNotes
 * @apiGroup Notes
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notes not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
