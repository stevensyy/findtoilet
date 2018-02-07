import axios from 'axios'

export const FetchData = () => {
  const request = axios.get('http://10.1.230.11:5000/api/status')
  return (dispatch) => {
    request.then(({data}) => {
      dispatch({type: 'FETCH_DATA', data})
    })
  }
}
