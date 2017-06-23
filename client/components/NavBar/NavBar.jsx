import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </nav>
    )
  }
}

export default NavBar