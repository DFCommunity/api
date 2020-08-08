import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Home } from '.'

const app = () => express(apiRoot, routes)

let home

beforeEach(async () => {
  home = await Home.create({})
})

test('POST // 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, Title: 'test', Context: 'test', Version: 'test', Organisation: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Title).toEqual('test')
  expect(body.Context).toEqual('test')
  expect(body.Version).toEqual('test')
  expect(body.Organisation).toEqual('test')
})

test('POST // 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET // 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET ///:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${home.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(home.id)
})

test('GET ///:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT ///:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${home.id}`)
    .send({ access_token: masterKey, Title: 'test', Context: 'test', Version: 'test', Organisation: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(home.id)
  expect(body.Title).toEqual('test')
  expect(body.Context).toEqual('test')
  expect(body.Version).toEqual('test')
  expect(body.Organisation).toEqual('test')
})

test('PUT ///:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('PUT ///:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, Title: 'test', Context: 'test', Version: 'test', Organisation: 'test' })
  expect(status).toBe(404)
})

test('DELETE ///:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE ///:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('DELETE ///:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
