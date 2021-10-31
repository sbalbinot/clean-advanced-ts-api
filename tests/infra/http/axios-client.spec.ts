import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (params: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(params.url, { params: params.params })
    return result.data
  }
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    it('should call get with correct params', async () => {
      await sut.get({ url: url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url: url, params })

      expect(result).toEqual('any_data')
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
