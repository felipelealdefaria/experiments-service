export interface Experiments {
  init: (params: InitParams) => Promise<any>
  convert: (params: ConvertParams) => Promise<void>
  participate: (params: ParticipateParams) => Promise<ParticipateResponse>
}

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
