const initialState = {
    darkMode: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_COLOR_MODE":
            return {
                ...state, 
                darkMode: action.mode
            }
        default: 
            return state
    }
}

export default reducer;