import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Home, { schema } from './model'

const router = new Router()
const { Title, Discription, Tags, Build, Creator, Docs, Org, OrgWebsite } = schema.tree

/**
 * @api {post} // Create home
 * @apiName CreateHome
 * @apiGroup Home
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Title Home's Title.
 * @apiParam Discription Home's Discription.
 * @apiParam Tags Home's Tags.
 * @apiParam Build-State Home's Build-State.
 * @apiParam Creator Home's Creator.
 * @apiParam Docs Home's Docs.
 * @apiParam Org Home's Org.
 * @apiParam Org-Website Home's Org-Website.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ Title, Discription, Tags, Build, Creator, Docs, Org, OrgWebsite }),
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
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam Title Home's Title.
 * @apiParam Discription Home's Discription.
 * @apiParam Tags Home's Tags.
 * @apiParam Build-State Home's Build-State.
 * @apiParam Creator Home's Creator.
 * @apiParam Docs Home's Docs.
 * @apiParam Org Home's Org.
 * @apiParam Org-Website Home's Org-Website.
 * @apiSuccess {Object} home Home's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ Title, Discription, Tags, Build, Creator, Docs, Org, OrgWebsite }),
  update)

/**
 * @api {delete} ///:id Delete home
 * @apiName DeleteHome
 * @apiGroup Home
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Home not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
