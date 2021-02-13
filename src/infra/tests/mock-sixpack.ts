import * as Exp from '@/data/experiments-params'
import * as mockData from '@/infra/tests/mock-data'

export class SixpackSpy implements Exp.ExperimentsParams {
  async startExperiment (): Promise<any> {
    const res = mockData.mockStartExperimentResponse()
    return { session: res.session }
  }

  async participateExperiment (params: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    const res = mockData.mockParticipateResponse()
    const { experimentName } = params
    return { status: res.status, experimentName, alternativeName: res.alternativeName }
  }

  async convertEvent (params: Exp.ConvertParams): Promise<Exp.ConvertResponse> {
    const res = mockData.mockConvertResponse()
    const { experimentName, kpi } = params
    return {
      kpi: kpi,
      experimentName,
      status: res.status,
      alternativeName: res.alternativeName
    }
  }
}
