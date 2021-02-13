import faker from 'faker'
import * as Exp from '@/data/experiments-params'

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

export const mockStartExperimentResponse = () => ({
  session: shareParams.session
})

export const mockParticipateParams = (): Exp.ParticipateParams => ({
  session: shareParams.session,
  traffic: faker.random.number(),
  variationsName: shareParams.variations,
  experimentName: shareParams.experimentName,
  force: faker.random.arrayElement(shareParams.variations)
})

export const mockParticipateResponse = (): Exp.ParticipateResponse => ({
  status: 'ok',
  experimentName: shareParams.experimentName,
  alternativeName: shareParams.alternativeName
})

export const mockConvertParams = (): Exp.ConvertParams => ({
  kpi: shareParams.kpi,
  session: shareParams.session,
  experimentName: shareParams.experimentName
})

export const mockConvertResponse = (): Exp.ConvertResponse => ({
  status: 'ok',
  kpi: shareParams.kpi,
  experimentName: shareParams.experimentName,
  alternativeName: shareParams.alternativeName
})
