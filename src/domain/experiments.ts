export interface Experiments {
  init: (params: InitParams) => Promise<InitResponse>
  convert: (params: ConvertParams) => Promise<ConvertResponse>
  participate: (params: ParticipateParams) => Promise<ParticipateResponse>
}

export type StatusResponse = {
  error?: boolean
  success?: boolean
  message?: string
}

export type InitParams = {
  baseUrl: string
  timeout?: number
}

export type InitResponse = {
  session: unknown
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

export type ParticipateParams = {
  session: unknown
  traffic?: number
  variationsName: string[]
  experimentName: string
}

export type ParticipateResponse = {
  alternativeName?: string | null
  experimentName?: string | null
} & StatusResponse
