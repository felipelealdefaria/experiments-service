import React from 'react'
import ReactDOM from 'react-dom'
import { ButtonExperiments } from './components/button-experiment'
import { ExperimentsProvider } from './context/experiments-context'

const App = () => {
  return (
    <>
      <ExperimentsProvider>
        <ButtonExperiments />
      </ExperimentsProvider>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
