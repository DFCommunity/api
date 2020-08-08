import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Home, { schema } from './model'

const router = new Router()
const { Title, Context, Version, Organisation } = schema.tree

/**
 * @api {post} // Create home
 * @apiName CreateHome
 * @apiGroup Home
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam Title Home's Title.
 * @apiParam Context Home's Context.
 * @apiParam Version Home's Version.
 * @apiParam Organisation Home's Organisation.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ Title, Context, Version, Organisation }),
  create)

/**
 * @api {get} // Retrieve homes
 * @apiName RetrieveHomes
 * @apiGroup Home
 * @apiUse listParams
 * @apiSuccess {Object[]} homes List of homes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} ///:id Retrieve home
 * @apiName RetrieveHome
 * @apiGroup Home
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} ///:id Update home
 * @apiName UpdateHome
 * @apiGroup Home
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam Title Home's Title.
 * @apiParam Context Home's Context.
 * @apiParam Version Home's Version.
 * @apiParam Organisation Home's Organisation.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ Title, Context, Version, Organisation }),
  update)

/**
 * @api {delete} ///:id Delete home
 * @apiName DeleteHome
 * @apiGroup Home
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Home not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
