import { Snipet } from '.'

let snipet

beforeEach(async () => {
  snipet = await Snipet.create({ Title: 'test', Language: 'test', Body: 'test', Tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = snipet.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(snipet.id)
    expect(view.Title).toBe(snipet.Title)
    expect(view.Language).toBe(snipet.Language)
    expect(view.Body).toBe(snipet.Body)
    expect(view.Tags).toBe(snipet.Tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = snipet.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(snipet.id)
    expect(view.Title).toBe(snipet.Title)
    expect(view.Language).toBe(snipet.Language)
    expect(view.Body).toBe(snipet.Body)
    expect(view.Tags).toBe(snipet.Tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
