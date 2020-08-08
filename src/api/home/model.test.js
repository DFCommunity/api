import { Home } from '.'

let home

beforeEach(async () => {
  home = await Home.create({ Title: 'test', Discription: 'test', Tags: 'test', Build: 'test', Creator: 'test', Docs: 'test', Org: 'test', OrgWebsite: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = home.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.Title).toBe(home.Title)
    expect(view.Discription).toBe(home.Discription)
    expect(view.Tags).toBe(home.Tags)
    expect(view.Build).toBe(home.Build)
    expect(view.Creator).toBe(home.Creator)
    expect(view.Docs).toBe(home.Docs)
    expect(view.Org).toBe(home.Org)
    expect(view.OrgWebsite).toBe(home.OrgWebsite)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = home.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(home.id)
    expect(view.Title).toBe(home.Title)
    expect(view.Discription).toBe(home.Discription)
    expect(view.Tags).toBe(home.Tags)
    expect(view.Build).toBe(home.Build)
    expect(view.Creator).toBe(home.Creator)
    expect(view.Docs).toBe(home.Docs)
    expect(view.Org).toBe(home.Org)
    expect(view.OrgWebsite).toBe(home.OrgWebsite)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
