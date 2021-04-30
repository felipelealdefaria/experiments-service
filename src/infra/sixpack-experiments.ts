/* eslint-disable @typescript-eslint/no-var-requires */
import * as Exp from '@/data/experiments-params'

const sixpack = require('sixpack-client')

export class SixpackExperiments implements Exp.ExperimentsParams {
  async startExperiment ({ baseUrl, timeout }: Exp.StartExperimentParams): Promise<Exp.StartExperimentResponse> {
    try {
      const res = await new sixpack.Session({ base_url: baseUrl, timeout: timeout || 8000 })
      return { success: true, session: res }
    } catch (error) {
      console.error('SIXPACK INIT ERROR: ', error)
      return { error: true, session: null }
    }
  }

  async participateExperiment (params: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    const { force, traffic, session, experimentName, variationsName } = params
    return new Promise<Exp.ParticipateResponse>((resolve, reject) => {
      try {
        if (!session) return console.error('[PARTICIPATE] SESSION NOT FOUND');

        (session as any).participate(experimentName, variationsName, traffic, force, (error: any, result: any): any => {
          if (error) return reject(error)
          if (result) {
            if (result.status === 'failed') {
              console.error('[PARTICIPATE] REQUEST ERROR: ', result?.error)
              return resolve({ error: true, message: result?.error })
            }
            return resolve({
              success: true,
              experimentName: result?.experiment?.name,
              alternativeName: result?.alternative?.name
            })
          }
        })
      } catch (error) {
        console.error('SIXPACK PARTICIPATE ERROR: ', error)
        return { error: true, message: error }
      }
    })
  }

  async convertEvent (params: Exp.ConvertParams): Promise<Exp.ConvertResponse> {
    const { kpi, session, experimentName } = params
    return new Promise<Exp.ConvertResponse>((resolve) => {
      try {
        if (!session) return console.error('[CONVERT] SESSION NOT FOUND');

        (session as any).convert(experimentName, kpi, (_null: null, result: any): any => {
          if (result?.status) {
            return resolve({
              success: true,
              kpi: result?.conversion?.kpi,
              experimentName: result?.experiment?.name,
              alternativeName: result?.alternative?.name
            })
          }
        })
      } catch (error) {
        console.error('SIXPACK CONVERT ERROR: ', error)
        return { error: true, message: error }
      }
    })
  }
}
