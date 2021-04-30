import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../data/experiments-params'

describe('Experiments Service', () => {
  test('Should to have be called startExperiment function with correct params and correct response', async () => {
    const { sixpack } = makeSut()
    const startExperimentSpy = jest.spyOn(sixpack, 'startExperiment').mockImplementation(async () => Promise.resolve({ success: true, session: mock?.session }))

    const res: Types.StartExperimentResponse = await sixpack.startExperiment({ baseUrl: mock?.baseUrl, timeout: 8000 })

    expect(res).toEqual({ success: true, session: mock?.session })
    expect(startExperimentSpy).toHaveBeenCalledWith({ baseUrl: mock?.baseUrl, timeout: 8000 })
  })

  test('Should to have be called startExperiment function with error response', async () => {
    const { sixpack } = makeSut()
    const startExperimentSpy = jest.spyOn(sixpack, 'startExperiment').mockImplementation(async () => Promise.resolve({ error: true, session: null }))

    const res: Types.StartExperimentResponse = await sixpack.startExperiment({ baseUrl: mock?.baseUrl, timeout: 8000 })

    expect(res).toEqual({ error: true, session: null })
    expect(startExperimentSpy).toHaveBeenCalledWith({ baseUrl: mock?.baseUrl, timeout: 8000 })
  })
})
