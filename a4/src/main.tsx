import { render } from 'preact'
import * as State from './state'

import './index.css'

// Import the views
import ToolBarView from './toolbar'
import ShapeListView from './shapelist'
import StatusBarView from './statusbar'
import RightView from './rightview'

const app = document.querySelector('div#app')
if (!app) throw new Error('No app element found')

// Initialize the app
State.init()

// Root component
function App() {
  return (
    <>
      <div id="left-view">
        <ToolBarView />
        <ShapeListView />
        <StatusBarView />
      </div>
      <RightView />
    </>
  )
}

// Render the app
render(<App />, app)
