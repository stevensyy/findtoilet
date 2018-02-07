import React, {Component} from 'react'
import Room from '../components/room'
import { connect } from 'react-redux'
import '../css/building.css'

class Building extends Component {
  displayRoom () {
    const checkToilet = this.props.checkToilet.toiletlist

    let roomArr = []
    if (checkToilet) {
      console.log(checkToilet[0].inUse)
      console.log(checkToilet[1].inUse)
      for (let i = 0; i < checkToilet.length; i++) {
        roomArr.push(<Room key={checkToilet[i].id} checkToilet={checkToilet[i]} />)
      }
    }
    return roomArr
  }
  render () {
    return (
      <div className='building'>
        <div className='building1-shadow'></div>
        <div className='building1'>
          {this.displayRoom()}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    checkToilet: state.checkToilet
  })
}
export default connect(mapStateToProps, {})(Building)
