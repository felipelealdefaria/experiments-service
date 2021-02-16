import React, { createContext, useContext, useState, useEffect } from 'react'
import type * as E from './experiments-types'

import slugify from 'slugify'
import { experiment } from 'experiments-service'

const ExperimentsContext = createContext<E.ExperimentsContextParams>({} as E.ExperimentsContextParams)

export const useExperimentsContext = (): E.ExperimentsContextParams => useContext(ExperimentsContext)

export function ExperimentsProvider ({ children }: any): any {
  const isProd = process.env.NODE_ENV === 'production'
  const [session, setSession] = useState()
  const [alternatives, setAlternatives] =
    useState<E.AlternativesParams>({ experimentName: 'variantName' })

  useEffect(() => {
    startSession({ baseUrl: 'http://127.0.0.1:5000' })
      .then(res => res)
      .catch(err => console.error(err))
  }, [])

  const startSession = async ({ baseUrl }: E.StartSessionParams): Promise<any> => {
    const res = await experiment.init({ baseUrl: baseUrl })
    setSession(res)
  }

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

    const res = await experiment.participate(
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

    await experiment.convert({ session, experimentName: expNameFormatted, kpi })
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
