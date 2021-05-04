import { mock } from '../mock-data'
import { makeSut } from '../make-sut'
import * as Types from '../../data/experiments-params'

describe('Experiments Service', () => {
  test('Should to have be called convertEvent function with correct params and correct response', async () => {
    const { sixpack } = makeSut()
    const convertEventSpy = jest.spyOn(sixpack, 'convertEvent').mockImplementation(async () => Promise.resolve({ success: true, kpi: mock?.kpi, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName }))

    const res: Types.ConvertResponse = await sixpack.convertEvent({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })

    expect(res).toEqual({ success: true, kpi: mock?.kpi, experimentName: mock?.experimentName, alternativeName: mock?.alternativeName })
    expect(convertEventSpy).toHaveBeenCalledWith({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })
  })

  test('Should to have be called convertEvent function with error response', async () => {
    const { sixpack } = makeSut()
    const convertEventSpy = jest.spyOn(sixpack, 'convertEvent').mockImplementation(async () => Promise.resolve({ error: true, message: mock?.message }))

    const res: Types.ConvertResponse = await sixpack.convertEvent({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })

    expect(res).toEqual({ error: true, message: mock?.message })
    expect(convertEventSpy).toHaveBeenCalledWith({ session: mock?.session, kpi: mock?.kpi, experimentName: mock?.experimentName })
  })
})
