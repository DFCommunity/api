import { Contactus } from '.'

let contactus

beforeEach(async () => {
  contactus = await Contactus.create({ name: 'test', email: 'test', service: 'test', message: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = contactus.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contactus.id)
    expect(view.name).toBe(contactus.name)
    expect(view.email).toBe(contactus.email)
    expect(view.service).toBe(contactus.service)
    expect(view.message).toBe(contactus.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = contactus.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contactus.id)
    expect(view.name).toBe(contactus.name)
    expect(view.email).toBe(contactus.email)
    expect(view.service).toBe(contactus.service)
    expect(view.message).toBe(contactus.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
