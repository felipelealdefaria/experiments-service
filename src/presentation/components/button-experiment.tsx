import React, { useEffect, useState } from 'react'
import { useExperimentsContext } from '@/presentation/context/experiments-context'

export const ButtonExperiments: React.FC = () => {
  const [experiment, setExperiment] = useState({ alternativeName: 'initial' })
  const { participate, convert } = useExperimentsContext()

  const i = async (): Promise<any> => {
    return await participate({
      experimentName: 'button-experiment',
      variationsName: ['button-a', 'button-b']
    })
  }

  console.log({ experiment })

  useEffect(() => {
    i().then(res => setExperiment(res)).catch(err => console.log(err))
  }, [])

  const handleClick = (): void => {
    convert({ experimentName: 'button-experiment', kpi: 'click' })
  }

  return (
    <>
      {experiment?.alternativeName === 'button-b' ? (
        <button title="teste" onClick={handleClick} type="button">teste-b</button>
      ) : (
        <button title="teste" onClick={handleClick} type="button">teste-a</button>
      )}
    </>
  )
}
