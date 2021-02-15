import * as Exp from '@/data/experiments-params'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sixpack = require('sixpack-client')

export class SixpackExperiments implements Exp.ExperimentsParams {
  async startExperiment ({ baseUrl }: Exp.StartExperimentParams): Promise<any> {
    try {
      return new sixpack.Session({
        timeout: 8000,
        base_url: baseUrl
      })
    } catch (error) {
      console.error('SIXPACK INIT ERROR: ', error)
    }
  }

  async participateExperiment ({
    force,
    traffic,
    session,
    experimentName,
    variationsName
  }: Exp.ParticipateParams): Promise<Exp.ParticipateResponse> {
    return new Promise<any>((resolve, reject) => {
      try {
        if (!session) return console.error('[PARTICIPATE] SESSION NOT FOUND')

        session.participate(
          experimentName,
          variationsName,
          traffic,
          force,
          (error: any, result: any): any => {
            if (error) return reject(error)
            if (result) {
              if (result.status === 'failed') {
                console.error('[PARTICIPATE] REQUEST ERROR: ', result?.error)
              }
              return resolve({
                experimentName: result?.experiment?.name,
                alternativeName: result?.alternative?.name
              })
            }
          })
      } catch (error) {
        console.log('SIXPACK PARTICIPATE ERROR: ', error)
      }
    })
  }

  async convertEvent ({
    kpi,
    session,
    experimentName
  }: Exp.ConvertParams): Promise<Exp.ConvertResponse> {
    return new Promise<any>((resolve, reject) => {
      try {
        if (!session) return console.error('[CONVERT] SESSION NOT FOUND')

        session.convert(experimentName, kpi, (_null: null, result: any): any => {
          if (result?.status) {
            return resolve({
              status: result?.status,
              kpi: result?.conversion?.kpi,
              experimentName: result?.experiment?.name,
              alternativeName: result?.alternative?.name
            })
          }
        })
      } catch (error) {
        console.log('SIXPACK CONVERT ERROR: ', error)
      }
    })
  }
}
