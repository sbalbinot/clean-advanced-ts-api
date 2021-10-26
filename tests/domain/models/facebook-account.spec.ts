import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  const facebookData = {
    name: 'any_facebook_name',
    email: 'any_facebook_email',
    facebookId: 'any_facebook_id'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(facebookData)

    expect(sut).toEqual(facebookData)
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any_id' }

    const sut = new FacebookAccount(facebookData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })

  it('should not update name if its not empty', () => {
    const accountData = {
      id: 'any_id',
      name: 'any_name'
    }

    const sut = new FacebookAccount(facebookData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })
})
