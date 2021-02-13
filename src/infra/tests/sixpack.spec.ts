import * as mockData from '@/infra/tests/mock-data'
import { SixpackSpy } from '@/infra/tests/mock-sixpack'
import { SixpackExperiments } from '@/infra/sixpack-experiments'

jest.mock('@/infra/sixpack-experiments.ts')

type SutTypes = {
  sut: SixpackExperiments
  mockSixpack: SixpackSpy
}

const makeSut = (): SutTypes => {
  const sut = new SixpackExperiments()
  const mockSixpack = new SixpackSpy()
  return {
    sut,
    mockSixpack
  }
}

describe('SixpackExperiments', () => {
  test('Should return startExperiment with correct response', async () => {
    const { mockSixpack } = makeSut()
    const response = mockData.mockStartExperimentResponse()

    const res = await mockSixpack.startExperiment()
    expect(res).toEqual(response)
  })

  test('Should call participateExperiment() with correct values', async () => {
    const { sut } = makeSut()
    const params = mockData.mockParticipateParams()

    await sut.participateExperiment(params)

    expect(sut.participateExperiment).toHaveBeenCalledWith({
      force: params.force,
      session: params.session,
      traffic: params.traffic,
      variationsName: params.variationsName,
      experimentName: params.experimentName
    })
  })

  test('Should return participateExperiment() with correct response', async () => {
    const { mockSixpack } = makeSut()
    const params = mockData.mockParticipateParams()
    const response = mockData.mockParticipateResponse()

    const res = await mockSixpack.participateExperiment(params)
    expect(res).toEqual(response)
  })

  test('Should call convertEvent() with correct values', async () => {
    const { sut } = makeSut()
    const params = mockData.mockConvertParams()

    await sut.convertEvent(params)

    expect(sut.convertEvent).toHaveBeenCalledWith({
      kpi: params.kpi,
      session: params.session,
      experimentName: params.experimentName
    })
  })

  test('Should return convertExperiment() with correct response', async () => {
    const { mockSixpack } = makeSut()
    const params = mockData.mockConvertParams()
    const response = mockData.mockConvertResponse()

    const res = await mockSixpack.convertEvent(params)
    expect(res).toEqual(response)
  })
})
