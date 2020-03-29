import actionTypes from './actions'

import { updateState } from './utils'

const initialState = {
    ingredients: {},
    initialPrice: 0,
    totalPrice: 0,
    checkout: null
}

const addPrice = (state, action) => {
    let addPrice = state.totalPrice + action.price
    addPrice = addPrice >= 0 ? addPrice : 0
    return updateState(state, { totalPrice: +(+addPrice).toFixed(2) })
}

const subtractPrice = (state, action) => {
    let subPrice = state.totalPrice - action.price
    subPrice = subPrice >= 0 ? subPrice : 0

    return updateState(state, { totalPrice: +(+subPrice).toFixed(2) })
}

const incIngredient = (state, action) => {
    let addIngredients = { ...state.ingredients }
    let aIk = action.ingredient
    let incAmount = action.amount
    incAmount = incAmount ? incAmount : 1
    let addCalc = addIngredients[aIk] + incAmount
    addIngredients[aIk] = addCalc
    return updateState(state, { ingredients: addIngredients })
}

const decIngredient = (state, action) => {
    let subIngredients = { ...state.ingredients }
    let sIk = action.ingredient
    let subCalc = subIngredients[sIk] - (action.amount ? action.amount : 1)
    subCalc = subCalc >= 0 ? subCalc : 0
    subIngredients[sIk] = subCalc

    return updateState(state, { ingredients: subIngredients })
}

const resetIngredients = (state, action) => {
    const prevIngs = state.ingredients
    const newIngs = {}
    Object.keys(prevIngs).map(ing => newIngs[ing] = 0)
    return updateState(state, {
        ingredients: newIngs,
        totalPrice: state.initialPrice
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRICE: return addPrice(state, action)
        case actionTypes.SUBTRACT_PRICE: return subtractPrice(state, action)
        case actionTypes.SET_INGREDIENTS: return updateState(state, { ingredients: { ...action.ingredients } })
        case actionTypes.INC_INGREDIENT: return incIngredient(state, action)
        case actionTypes.DEC_INGREDIENT: return decIngredient(state, action)
        case actionTypes.RESET_INGREDIENTS: return resetIngredients(state, action)
        case actionTypes.SET_INITIAL_PRICE: return updateState(state, { initialPrice: action.price })
        case actionTypes.SET_TOTAL_PRICE: return updateState(state, { totalPrice: action.price })

        default:
            return state
    }
}

export default reducer