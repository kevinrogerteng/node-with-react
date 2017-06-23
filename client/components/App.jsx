import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './NavBar/NavBar.jsx'
import LandingPage from './LandingPage/LandingPage.jsx'
import AboutPage from './AboutPage/AboutPage.jsx'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          {/* Declare which components are rendered for our routes */}
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={AboutPage} />
        </div>
      </Router>
    )
  }
}

export default App