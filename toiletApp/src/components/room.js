import React, { Component } from 'react'
import Door from './door'
import WarningLight from './warningLight'

import '../css/room.css'
class Room extends Component {
  render () {
    const inUse = this.props.checkToilet.inUse
    return (
      <div className='room'>
        <WarningLight inUse={inUse} />
        <Door inUse={inUse} />
      </div>
    )
  }
}

export default Room
