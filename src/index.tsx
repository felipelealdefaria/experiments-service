import React from 'react'
import ReactDOM from 'react-dom'

import { ExamplePage } from '@/presentation/pages/example-page'
import { ExperimentsProvider } from '@/presentation/context/experiments-context'

const App: React.FC = () => {
  return (
    <ExperimentsProvider>
      <ExamplePage />
    </ExperimentsProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('main'))
