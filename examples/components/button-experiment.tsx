import React, { useEffect, useState } from 'react'
import { useExperimentsContext } from '../context/experiments-context'

export const ButtonExperiments: React.FC = () => {
  const [experiment, setExperiment] = useState({ alternativeName: 'initial' })
  const { participate, convert } = useExperimentsContext()

  const participateExperiment = async (): Promise<any> => {
    return await participate({
      experimentName: 'button-experiment',
      variationsName: ['button-a', 'button-b']
    })
  }

  useEffect(() => {
    participateExperiment()
      .then(res => setExperiment(res))
      .catch(err => console.log(err))
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
