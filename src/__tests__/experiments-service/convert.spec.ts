import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../domain/experiments'

describe('Experiments Service', () => {
  test('Should to have be called convert function with correct params and correct response', async () => {
    const { experiments } = makeSut()
    const convertSpy = jest.spyOn(experiments, 'convert').mockImplementation(async () => Promise.resolve({ success: true, kpi: mock?.kpi, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName }))

    const res: Types.ConvertResponse = await experiments.convert({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })

    expect(res).toEqual({ success: true, kpi: mock?.kpi, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName })
    expect(convertSpy).toHaveBeenCalledWith({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })
  })

  test('Should to have be called convert function with error response', async () => {
    const { experiments } = makeSut()
    const convertSpy = jest.spyOn(experiments, 'convert').mockImplementation(async () => Promise.resolve({ error: true, message: mock?.message }))

    const res: Types.ConvertResponse = await experiments.convert({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })

    expect(res).toEqual({ error: true, message: mock?.message })
    expect(convertSpy).toHaveBeenCalledWith({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })
  })
})
