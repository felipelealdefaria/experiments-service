export interface ExperimentsParams {
  startExperiment: (params: StartExperimentParams) => Promise<any>
  convertEvent: (params: ConvertParams) => Promise<ConvertResponse>
  participateExperiment: (params: ParticipateParams) => Promise<ParticipateResponse>
}

export type StartExperimentParams = {
  baseUrl: string
}

export type ParticipateParams = {
  session: any
  traffic?: number
  force: string | null
  variationsName: string[]
  experimentName: string
}

export type ParticipateResponse = {
  status: string
  experimentName: string
  alternativeName: string
}

export type ConvertParams = {
  kpi?: string
  session: any
  experimentName: string
}

export type ConvertResponse = {
  kpi?: string
  status: string
  experimentName: string
  alternativeName: string
}
