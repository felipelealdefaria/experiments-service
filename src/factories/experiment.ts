import { Experiments } from '@/domain/experiments'
import { makeSixpackExperiments } from '@/factories/sixpack'
import { ExperimentsService } from '@/data/experiments-service'

const makeExperimentService = (): Experiments => new ExperimentsService(makeSixpackExperiments())

export const experiment = makeExperimentService()
