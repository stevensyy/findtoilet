import React, { Component } from 'react'
import '../css/door.css'
import toolong from '../img/toolong.svg'
import toiletSit from '../img/toiletSit.svg'

class Room extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasPeople: this.props.inUse
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.inUse !== this.props.inUse) {
      this.setState({
        hasPeople: nextProps.inUse
      })
    }
  }
  insideDoor = () => {
    const toolongstyles = {
      width: '120px',
      height: '120px',
      position: 'absolute',
      bottom: '-2px',
      left: '-10%'
    }
    const toiletSitStyle = {
      width: '100px',
      height: '100px',
      position: 'absolute',
      bottom: '1px',
      left: '0%'
    }
    
    return this.state.hasPeople
    ? <img src={toolong} style={toolongstyles} alt='hasPeople' /> 
    : <img src={toiletSit} style={toiletSitStyle} alt='noPeople' />
  }

  render () {
    return (
      <div className='door' >
        <div className='door-frame'>
          {this.insideDoor()}
        </div>
        <div className={`door-open ${this.state.hasPeople ? '' : 'noPeople'}`}>
          <div className='inner-door-knob'></div>
        </div>
      </div>
    )
  }
}
export default Room
