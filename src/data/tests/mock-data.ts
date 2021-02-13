import faker from 'faker'
import { Experiments } from '@/domain/experiments'

const shareParams = {
  session: {
    convert: () => {},
    participate: () => {}
  },
  variations: ['a', 'b'],
  kpi: faker.lorem.word(),
  experimentName: faker.lorem.word(),
  alternativeName: faker.random.arrayElement(['a', 'b'])
}

export const mockInitParams = () => ({
  baseUrl: faker.internet.url()
})

export const mockInitResponse = () => ({
  session: shareParams.session
})

export const mockParticipateParams = (): Experiments.ParticipateParams => ({
  session: shareParams.session,
  traffic: faker.random.number(),
  variationsName: shareParams.variations,
  experimentName: shareParams.experimentName
})

export const mockParticipateResponse = (): Experiments.ParticipateResponse => ({
  experimentName: shareParams.experimentName,
  alternativeName: shareParams.alternativeName
})

export const mockConvertParams = (): Experiments.ConvertParams => ({
  kpi: shareParams.kpi,
  session: shareParams.session,
  experimentName: shareParams.experimentName
})
