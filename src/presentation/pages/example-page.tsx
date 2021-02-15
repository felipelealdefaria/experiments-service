import React, { useEffect } from 'react'
import { ButtonExperiments } from '@/presentation/components/button-experiment'
import { useExperimentsContext } from '@/presentation/context/experiments-context'

export const ExamplePage: React.FC = () => {
  const { startSession } = useExperimentsContext()

  useEffect(() => {
    startSession({ baseUrl: 'http://127.0.0.1:5000' })
      .then(res => res)
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <ButtonExperiments />
    </>
  )
}
