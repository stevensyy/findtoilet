import React, {Component} from 'react'
import '../css/warningLight.css'

class WarningLight extends Component {
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
  render () {
    return (
      <div className='warningLight'>
        <div className='container'>
          <a className='bulb-light'>
            <div className={`light ${this.state.hasPeople ? 'isLighting' : ''}`}></div>
            <div className='bulb'>
              <div className={`bulb-top ${this.state.hasPeople ? 'bulb-lighting' : ''}`}>
                <div className='reflection'></div>
              </div>
              <div className={`bulb-middle-1 ${this.state.hasPeople ? 'bulb-middle-animate' : ''}`}></div>
              <div className={`bulb-bottom ${this.state.hasPeople ? 'bulb-lighting' : ''}`}></div>
            </div>
            <div className='base'>
              <div className='screw-top'></div>
              <div className='screw-d'></div>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
export default WarningLight
