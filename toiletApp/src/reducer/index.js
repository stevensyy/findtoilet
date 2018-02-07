const defaultState = {
  checkToilet: []
}

const ToiletApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, checkToilet: action.data }
    default:
      return state
  }
}
export default ToiletApp
