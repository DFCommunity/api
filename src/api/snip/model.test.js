import { Snip } from '.'
import { User } from '../user'

let user, snip

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  snip = await Snip.create({ Creator: user, Title: 'test', Code: 'test', Lang: 'test', Tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = snip.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(snip.id)
    expect(typeof view.Creator).toBe('object')
    expect(view.Creator.id).toBe(user.id)
    expect(view.Title).toBe(snip.Title)
    expect(view.Code).toBe(snip.Code)
    expect(view.Lang).toBe(snip.Lang)
    expect(view.Tags).toBe(snip.Tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = snip.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(snip.id)
    expect(typeof view.Creator).toBe('object')
    expect(view.Creator.id).toBe(user.id)
    expect(view.Title).toBe(snip.Title)
    expect(view.Code).toBe(snip.Code)
    expect(view.Lang).toBe(snip.Lang)
    expect(view.Tags).toBe(snip.Tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
