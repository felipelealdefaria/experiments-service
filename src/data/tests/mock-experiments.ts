import * as Exp from '@/domain/experiments'
import * as mockData from '@/data/tests/mock-data'

export class ExperimentSpy implements Exp.Experiments {
  init (params: Exp.InitParams): any {
    const res = mockData.mockInitResponse()
    return { session: res.session }
  }

  async participate (params: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    const res = await mockData.mockParticipateResponse()
    const { experimentName } = params
    return { experimentName, alternativeName: res.alternativeName }
  }

  async convert (params: Exp.ConvertParams): Promise<void> { await console.log('') }
}
