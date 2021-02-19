export type ExperimentsContextParams = {
  alternatives?: AlternativesParams
  convert (params: ConvertParams): Promise<any>
  startSession (params: StartSessionParams): Promise<void>
  participate (params: ParticipateParams): Promise<ParticipateResponse>
}

export type AlternativesParams = {
  [experimentName: string]: string
}

export type StartSessionParams = {
  baseUrl: string
}

export type ParticipateParams = {
  traffic?: number
  variationsName: string[]
  experimentName: string
}

export type ParticipateResponse = {
  experimentName: string
  alternativeName: string
}

export type ConvertParams = {
  kpi?: string
  experimentName: string
}
