import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repositories'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const facebookData = await this.facebookApi.loadUser(params)
    if (facebookData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: facebookData.email })
      await this.userAccountRepository.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? facebookData.name,
        email: facebookData.email,
        facebookId: facebookData.facebookId
      })
    }
    return new AuthenticationError()
  }
}
