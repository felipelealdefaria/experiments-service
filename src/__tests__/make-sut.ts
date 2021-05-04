import { SixpackExperiments } from '@/infra/sixpack-experiments'
import { ExperimentsService } from '@/data/experiments-service'

export type SutTypes = {
  sixpack: SixpackExperiments
  experiments: ExperimentsService
}

export const makeSut = (): SutTypes => {
  const sixpack = new SixpackExperiments()
  const experiments = new ExperimentsService(sixpack)
  return {
    sixpack,
    experiments
  }
}
