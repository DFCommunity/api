import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Snip } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, snip

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  snip = await Snip.create({ Creator: user })
})

test('POST /snipet 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, Title: 'test', Code: 'test', Lang: 'test', Tags: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Title).toEqual('test')
  expect(body.Code).toEqual('test')
  expect(body.Lang).toEqual('test')
  expect(body.Tags).toEqual('test')
  expect(typeof body.Creator).toEqual('object')
})

test('POST /snipet 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /snipet 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].Creator).toEqual('object')
})

test('GET /snipet 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /snipet/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${snip.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(snip.id)
})

test('GET /snipet/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /snipet/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${snip.id}`)
    .send({ access_token: userSession, Title: 'test', Code: 'test', Lang: 'test', Tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(snip.id)
  expect(body.Title).toEqual('test')
  expect(body.Code).toEqual('test')
  expect(body.Lang).toEqual('test')
  expect(body.Tags).toEqual('test')
  expect(typeof body.Creator).toEqual('object')
})

test('PUT /snipet/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${snip.id}`)
    .send({ access_token: anotherSession, Title: 'test', Code: 'test', Lang: 'test', Tags: 'test' })
  expect(status).toBe(401)
})

test('PUT /snipet/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${snip.id}`)
  expect(status).toBe(401)
})

test('PUT /snipet/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, Title: 'test', Code: 'test', Lang: 'test', Tags: 'test' })
  expect(status).toBe(404)
})

test('DELETE /snipet/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${snip.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /snipet/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${snip.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /snipet/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${snip.id}`)
  expect(status).toBe(401)
})

test('DELETE /snipet/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
