import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../domain/experiments'

describe('Experiments Service', () => {
  test('Should to have be called init function with correct params and correct response', async () => {
    const { experiments } = makeSut()
    const initSpy = jest.spyOn(experiments, 'init').mockImplementation(async () => Promise.resolve({ success: true, session: mock?.session }))

    const res: Types.InitResponse = await experiments.init({ baseUrl: mock?.baseUrl, timeout: 8000 })

    expect(res).toEqual({ success: true, session: mock?.session })
    expect(initSpy).toHaveBeenCalledWith({ baseUrl: mock?.baseUrl, timeout: 8000 })
  })

  test('Should to have be called init function with error response', async () => {
    const { experiments } = makeSut()
    const initSpy = jest.spyOn(experiments, 'init').mockImplementation(async () => Promise.resolve({ error: true, session: null }))

    const res: Types.InitResponse = await experiments.init({ baseUrl: mock?.baseUrl, timeout: 8000 })

    expect(res).toEqual({ error: true, session: null })
    expect(initSpy).toHaveBeenCalledWith({ baseUrl: mock?.baseUrl, timeout: 8000 })
  })
})
