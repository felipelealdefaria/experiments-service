import { Experiments } from '@/domain/experiments'
import * as mockData from '@/data/tests/mock-data'

export class ExperimentSpy implements Experiments {
  async init (params: Experiments.InitParams): Promise<any> {
    const res = mockData.mockInitResponse()
    return { session: res.session }
  }

  async participate (params: Experiments.ParticipateParams): Promise<Experiments.ParticipateResponse> {
    const res = mockData.mockParticipateResponse()
    const { experimentName } = params
    return { experimentName, alternativeName: res.alternativeName }
  }

  async convert (params: Experiments.ConvertParams): Promise<void> {}
}
