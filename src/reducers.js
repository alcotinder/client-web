const infoReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
      case 'ADD_INFO':
        return { name: action.payload.name, lastname: action.payload.lastname}
      default:
        return state
    }
}


  export {infoReducer}