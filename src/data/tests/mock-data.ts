import faker from 'faker'
import * as Exp from '@/domain/experiments'

const shareParams = {
  session: {
    convert: jest.fn(),
    participate: jest.fn()
  },
  variations: ['a', 'b'],
  kpi: faker.lorem.word(),
  experimentName: faker.lorem.word(),
  alternativeName: faker.random.arrayElement(['a', 'b'])
}

export const mockInitParams = (): Exp.InitParams => ({
  baseUrl: faker.internet.url()
})

export const mockInitResponse = (): any => ({
  session: shareParams.session
})

export const mockParticipateParams = (): Exp.ParticipateParams => ({
  session: shareParams.session,
  traffic: faker.random.number(),
  variationsName: shareParams.variations,
  experimentName: shareParams.experimentName
})

export const mockParticipateResponse = (): Exp.ParticipateResponse => ({
  experimentName: shareParams.experimentName,
  alternativeName: shareParams.alternativeName
})

export const mockConvertParams = (): Exp.ConvertParams => ({
  kpi: shareParams.kpi,
  session: shareParams.session,
  experimentName: shareParams.experimentName
})
