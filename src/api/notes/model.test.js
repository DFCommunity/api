import { Notes } from '.'
import { User } from '../user'

let user, notes

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  notes = await Notes.create({ author: user, topic: 'test', date: 'test', about: 'test', context: 'test', tags: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notes.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.topic).toBe(notes.topic)
    expect(view.date).toBe(notes.date)
    expect(view.about).toBe(notes.about)
    expect(view.context).toBe(notes.context)
    expect(view.tags).toBe(notes.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = notes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notes.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.topic).toBe(notes.topic)
    expect(view.date).toBe(notes.date)
    expect(view.about).toBe(notes.about)
    expect(view.context).toBe(notes.context)
    expect(view.tags).toBe(notes.tags)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
