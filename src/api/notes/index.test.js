import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Notes } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, notes

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  notes = await Notes.create({ author: user })
})

test('POST /notes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, topic: 'test', date: 'test', about: 'test', context: 'test', tags: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.topic).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.about).toEqual('test')
  expect(body.context).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /notes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].author).toEqual('object')
})

test('GET /notes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notes.id)
  expect(typeof body.author).toEqual('object')
})

test('GET /notes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${notes.id}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /notes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notes.id}`)
    .send({ access_token: userSession, topic: 'test', date: 'test', about: 'test', context: 'test', tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notes.id)
  expect(body.topic).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.about).toEqual('test')
  expect(body.context).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /notes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notes.id}`)
    .send({ access_token: anotherSession, topic: 'test', date: 'test', about: 'test', context: 'test', tags: 'test' })
  expect(status).toBe(401)
})

test('PUT /notes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notes.id}`)
  expect(status).toBe(401)
})

test('PUT /notes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, topic: 'test', date: 'test', about: 'test', context: 'test', tags: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notes/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notes.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /notes/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notes.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /notes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /notes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notes.id}`)
  expect(status).toBe(401)
})

test('DELETE /notes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
