import { ExperimentsService } from '@/data/experiments-service'
import * as mockData from '@/data/tests/mock-data'
import { SixpackSpy } from '@/infra/tests/mock-sixpack'
import { ExperimentSpy } from '@/data/tests/mock-experiments'

jest.mock('@/data/experiments-service.ts')

type SutTypes = {
  sut: ExperimentsService
  mockExperiments: ExperimentSpy
}

const makeSut = (): SutTypes => {
  const mockSixpack = new SixpackSpy()
  const mockExperiments = new ExperimentSpy()
  const sut = new ExperimentsService(mockSixpack)
  return {
    sut,
    mockExperiments
  }
}

describe('Experiment Service', () => {
  test('Should return init() with correct response', async () => {
    const { mockExperiments } = makeSut()
    const params = mockData.mockInitParams()
    const response = mockData.mockInitResponse()

    const res = await mockExperiments.init(params)
    expect(res).toEqual(response)
  })

  test('Should call participate() with correct values', async () => {
    const { sut } = makeSut()
    const params = mockData.mockParticipateParams()

    await sut.participate(params)

    expect(sut.participate).toHaveBeenCalledWith({
      session: params.session,
      traffic: params.traffic,
      variationsName: params.variationsName,
      experimentName: params.experimentName
    })
  })

  test('Should return participate() with correct response', async () => {
    const { mockExperiments } = makeSut()
    const params = mockData.mockParticipateParams()
    const response = mockData.mockParticipateResponse()

    const res = await mockExperiments.participate(params)
    expect(res).toEqual(response)
  })

  test('Should call convert() with correct values', async () => {
    const { sut } = makeSut()
    const params = mockData.mockConvertParams()

    await sut.convert(params)

    expect(sut.convert).toHaveBeenCalledWith({
      kpi: params.kpi,
      session: params.session,
      experimentName: params.experimentName
    })
  })
})
