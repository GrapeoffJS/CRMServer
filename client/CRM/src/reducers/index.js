const initialState = {
    index: 1
}

const reducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'ON_INDEX':
            return {
                ...state,
                index: state.index * action.payload
            }
        default:
            return state
    }
}

export default reducer