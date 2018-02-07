import React, { Component } from 'react'
import Building from './components/Building'
import Road from './components/road'
import Car from './components/car'
import City from './components/city'
import Logo from './img/logo.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {FetchData} from './actions'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.FetchData()
    setInterval(() => { this.props.FetchData() }, 1000)
  }

  render () {
    return (
      <div className='App'>
        <div className='moon'></div>
        <div className='logo'>
          <img style={{width: '100px'}}src={Logo} alt='logo'/>
          <h1 >Trend Micro</h1>
        </div>
        <Building />
        <City />
        <Road />
        <Car />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  checkToilet: state.checkToilet
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    FetchData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
