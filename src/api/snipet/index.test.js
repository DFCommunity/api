import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Snipet } from '.'

const app = () => express(apiRoot, routes)

let snipet

beforeEach(async () => {
  snipet = await Snipet.create({})
})

test('POST /snipets 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ Title: 'test', Language: 'test', Body: 'test', Tags: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Title).toEqual('test')
  expect(body.Language).toEqual('test')
  expect(body.Body).toEqual('test')
  expect(body.Tags).toEqual('test')
})

test('GET /snipets 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /snipets/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${snipet.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(snipet.id)
})

test('GET /snipets/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /snipets/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${snipet.id}`)
    .send({ Title: 'test', Language: 'test', Body: 'test', Tags: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(snipet.id)
  expect(body.Title).toEqual('test')
  expect(body.Language).toEqual('test')
  expect(body.Body).toEqual('test')
  expect(body.Tags).toEqual('test')
})

test('PUT /snipets/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ Title: 'test', Language: 'test', Body: 'test', Tags: 'test' })
  expect(status).toBe(404)
})

test('DELETE /snipets/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${snipet.id}`)
  expect(status).toBe(204)
})

test('DELETE /snipets/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
