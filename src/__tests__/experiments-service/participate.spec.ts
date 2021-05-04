import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../domain/experiments'

describe('Experiments Service', () => {
  test('Should to have be called participate function with correct params and correct response', async () => {
    const { experiments } = makeSut()
    const participateSpy = jest.spyOn(experiments, 'participate').mockImplementation(async () => Promise.resolve({ success: true, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName }))

    const res: Types.ParticipateResponse = await experiments.participate({ traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })

    expect(res).toEqual({ success: true, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName })
    expect(participateSpy).toHaveBeenCalledWith({ traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })
  })

  test('Should to have be called participate function with error response', async () => {
    const { experiments } = makeSut()
    const participateSpy = jest.spyOn(experiments, 'participate').mockImplementation(async () => Promise.resolve({ error: true, message: mock?.message }))

    const res: Types.ParticipateResponse = await experiments.participate({ traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })

    expect(res).toEqual({ error: true, message: mock?.message })
    expect(participateSpy).toHaveBeenCalledWith({ traffic: mock?.traffic, session: mock?.session, experimentName: mock?.experimentName, variationsName: mock?.variations })
  })
})
