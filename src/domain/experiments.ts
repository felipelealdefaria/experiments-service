export interface Experiments {
  init: (params: Experiments.InitParams) => Promise<any>
  convert: (params: Experiments.ConvertParams) => Promise<void>
  participate: (params: Experiments.ParticipateParams) => Promise<Experiments.ParticipateResponse>
}

export namespace Experiments {
  export type InitParams = {
    baseUrl: string
  }

  export type ConvertParams = {
    kpi?: string
    session: any
    experimentName: string
  }

  export type ParticipateParams = {
    session: any
    traffic?: number
    variationsName: string[]
    experimentName: string
  }

  export type ParticipateResponse = {
    alternativeName: string
    experimentName: string
  }
}