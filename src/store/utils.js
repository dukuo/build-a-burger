const updateState = (state, addToState) => {
    return {
        ...state,
        ...addToState
    }
}

export { updateState }