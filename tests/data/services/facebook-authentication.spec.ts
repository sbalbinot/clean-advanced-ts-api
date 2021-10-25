import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repositories'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepository: MockProxy<LoadUserAccountRepository & CreateFacebookAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId: 'any_facebook_id',
      email: 'any_facebook_email',
      name: 'any_facebook_name'
    })
    userAccountRepository = mock()
    sut = new FacebookAuthenticationService(facebookApi, userAccountRepository)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })
    expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_facebook_email' })
    expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should call createFacebookAccountRepository when LoadUserAccountRepository returns undefined', async () => {
    userAccountRepository.load.mockResolvedValueOnce(undefined)
    await sut.perform({ token })
    expect(userAccountRepository.createFromFacebook).toHaveBeenCalledWith({
      facebookId: 'any_facebook_id',
      email: 'any_facebook_email',
      name: 'any_facebook_name'
    })
    expect(userAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
