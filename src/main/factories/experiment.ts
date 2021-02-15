import { Experiments } from '@/domain/experiments'
import { ExperimentsService } from '@/data/experiments-service'
import { makeSixpackExperiments } from '@/main/factories/sixpack'

export const makeExperimentService = (): Experiments => new ExperimentsService(makeSixpackExperiments())
