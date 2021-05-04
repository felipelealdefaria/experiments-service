import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../data/experiments-params'

describe('Experiments Service', () => {
  test('Should to have be called participateExperiment function with correct params and correct response', async () => {
    const { sixpack } = makeSut()
    const participateExperimentSpy = jest.spyOn(sixpack, 'participateExperiment').mockImplementation(async () => Promise.resolve({ success: true, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName }))

    const res: Types.ParticipateResponse = await sixpack.participateExperiment({ force: null, traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })

    expect(res).toEqual({ success: true, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName })
    expect(participateExperimentSpy).toHaveBeenCalledWith({ force: null, traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })
  })

  test('Should to have be called participateExperiment function with error response', async () => {
    const { sixpack } = makeSut()
    const participateExperimentSpy = jest.spyOn(sixpack, 'participateExperiment').mockImplementation(async () => Promise.resolve({ error: true, message: mock?.message }))

    const res: Types.ParticipateResponse = await sixpack.participateExperiment({ force: null, traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })

    expect(res).toEqual({ error: true, message: mock?.message })
    expect(participateExperimentSpy).toHaveBeenCalledWith({ force: null, traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })
  })
})
