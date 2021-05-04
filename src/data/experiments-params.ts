export interface ExperimentsParams {
  convertEvent: (params: ConvertParams) => Promise<ConvertResponse>
  participateExperiment: (params: ParticipateParams) => Promise<ParticipateResponse>
  startExperiment: (params: StartExperimentParams) => Promise<StartExperimentResponse>
}

export type StatusResponse = {
  error?: boolean
  success?: boolean
  message?: string
}

export type StartExperimentParams = {
  baseUrl: string
  timeout?: number
}

export type StartExperimentResponse = {
  session: unknown
} & StatusResponse

export type ParticipateParams = {
  session: unknown
  traffic?: number
  force: string | null
  variationsName: string[]
  experimentName: string
}

export type ParticipateResponse = {
  experimentName?: string | null
  alternativeName?: string | null
} & StatusResponse

export type ConvertParams = {
  kpi?: string
  session: unknown
  experimentName: string
}

export type ConvertResponse = {
  kpi?: string
  experimentName?: string
  alternativeName?: string
} & StatusResponse
