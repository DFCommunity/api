import { Home } from '.'

let home

beforeEach(async () => {
  home = await Home.create({ Title: 'test', Context: 'test', Version: 'test', Organisation: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = home.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.Title).toBe(home.Title)
    expect(view.Context).toBe(home.Context)
    expect(view.Version).toBe(home.Version)
    expect(view.Organisation).toBe(home.Organisation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = home.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.Title).toBe(home.Title)
    expect(view.Context).toBe(home.Context)
    expect(view.Version).toBe(home.Version)
    expect(view.Organisation).toBe(home.Organisation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
