import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Home } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, home

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  home = await Home.create({})
})

test('POST // 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, Title: 'test', Discription: 'test', Tags: 'test', Build: 'test', Creator: 'test', Docs: 'test', Org: 'test', OrgWebsite: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.Title).toEqual('test')
  expect(body.Discription).toEqual('test')
  expect(body.Tags).toEqual('test')
  expect(body.Build).toEqual('test')
  expect(body.Creator).toEqual('test')
  expect(body.Docs).toEqual('test')
  expect(body.Org).toEqual('test')
  expect(body.OrgWebsite).toEqual('test')
})

test('POST // 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
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

test('PUT ///:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${home.id}`)
    .send({ access_token: adminSession, Title: 'test', Discription: 'test', Tags: 'test', Build: 'test', Creator: 'test', Docs: 'test', Org: 'test', OrgWebsite: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(home.id)
  expect(body.Title).toEqual('test')
  expect(body.Discription).toEqual('test')
  expect(body.Tags).toEqual('test')
  expect(body.Build).toEqual('test')
  expect(body.Creator).toEqual('test')
  expect(body.Docs).toEqual('test')
  expect(body.Org).toEqual('test')
  expect(body.Org).toEqual('test')
})

test('PUT ///:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${home.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT ///:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('PUT ///:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, Title: 'test', Discription: 'test', Tags: 'test', Build: 'test', Creator: 'test', Docs: 'test', Org: 'test', OrgWebsite: 'test' })
  expect(status).toBe(404)
})

test('DELETE ///:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE ///:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE ///:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${home.id}`)
  expect(status).toBe(401)
})

test('DELETE ///:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
