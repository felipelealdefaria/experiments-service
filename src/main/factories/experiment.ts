import { Experiments } from '@/domain/experiments'
import { ExperimentsService } from '@/data/experiments-service'
import { makeSixpackExperiments } from '@/main/factories/sixpack'

const makeExperimentService = (): Experiments => new ExperimentsService(makeSixpackExperiments())
export const experiment = makeExperimentService()
