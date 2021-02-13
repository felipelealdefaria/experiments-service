import { Experiments } from '@/domain/experiments'
import { ExperimentsService } from '@/data/experiments-service'
import { makeSixpackExperiments } from '@/main/sixpack-factory'

export const makeExperimentService = (): Experiments => new ExperimentsService(makeSixpackExperiments())
