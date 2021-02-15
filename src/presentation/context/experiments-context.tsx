import React, { createContext, useContext, useState } from 'react'
import slugify from 'slugify'

import type * as E from './experiments-types'
import makeExperimentService from '@/main/factories'

const ExperimentsContext = createContext<E.ExperimentsContextParams>({} as E.ExperimentsContextParams)

export const useExperimentsContext = (): E.ExperimentsContextParams => useContext(ExperimentsContext)

export function ExperimentsProvider ({ children }: any): any {
  const isProd = process.env.NODE_ENV === 'production'
  const experiments = makeExperimentService()
  const [session, setSession] = useState()
  const [alternatives, setAlternatives] =
    useState<E.AlternativesParams>({ experimentName: 'variantName' })

  const startSession = async ({ baseUrl }: E.StartSessionParams): Promise<any> => {
    const res = await experiments.init({ baseUrl: baseUrl })
    setSession(res)
  }

  console.log({ session })

  const getFormattedName = (name: string): string => {
    const prefixName = isProd ? name : `staging-${name}`
    const formattedName = slugify(prefixName, {
      lower: true,
      strict: true,
      replacement: '-'
    })

    return formattedName
  }

  const participate = async (params: E.ParticipateParams): Promise<E.ParticipateResponse> => {
    const { experimentName, variationsName, traffic } = params

    const expNameFormatted = getFormattedName(experimentName)

    const res = await experiments.participate(
      {
        session,
        traffic,
        variationsName,
        experimentName: expNameFormatted
      }
    )

    if (res.experimentName && res.alternativeName) {
      setAlternatives(old => ({
        ...old,
        [res.experimentName]: res.alternativeName
      }))
    }

    return {
      experimentName: res?.experimentName || '',
      alternativeName: res?.alternativeName || ''
    }
  }

  const convert = async (params: E.ConvertParams): Promise<void> => {
    const { experimentName, kpi } = params
    const expNameFormatted = getFormattedName(experimentName)

    await experiments.convert({ session, experimentName: expNameFormatted, kpi })
  }

  const values = {
    convert,
    participate,
    startSession,
    alternatives
  }

  return (
    <ExperimentsContext.Provider
      value={values}
    >
      {children}
    </ExperimentsContext.Provider>
  )
}
