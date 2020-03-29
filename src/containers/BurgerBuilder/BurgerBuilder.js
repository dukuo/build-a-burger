import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import actionTypes from '../../store/actions'

import firebase from '../../firebase/firebase'

import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'

import Modal from '../../components/UI/Modal/Modal'
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Spinner from '../../components/UI/Spinner/Spinner'
// import Backdrop from '../../components/UI/Backdrop/Backdrop'

import axios from '../../axios-orders'

import INGREDIENT_PRICES from '../../constants/ingredientPrices'

function BurgerBuilder(props) {
    // const [showSummaryModal, setShowSummaryModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [dissappear, setDissappear] = useState(false)
    const dispatch = useDispatch()

    const { ingredients, totalPrice} = useSelector(state => state)

    const addPrice =  (price)  => dispatch({ type: actionTypes.ADD_PRICE, price })
    const subPrice =  (price)  => dispatch({ type: actionTypes.SUBTRACT_PRICE, price })
    const setIngredients =  (ingredients)  => dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients })
    const resetBurger =  ()  => dispatch({ type: actionTypes.RESET_INGREDIENTS })
    const incIngredient =  (ingredient, amount)  => dispatch({ type: actionTypes.INC_INGREDIENT, ingredient, amount })
    const decIngredient =  (ingredient, amount)  => dispatch({ type: actionTypes.DEC_INGREDIENT, ingredient, amount })
    const setInitialPrice =  (price)  => dispatch({ type: actionTypes.SET_INITIAL_PRICE, price })
    const setTotalPrice =  (price)  => dispatch({ type: actionTypes.SET_TOTAL_PRICE, price })
    
    const { 
        match, history
    } = props

    useEffect(() => {
        setInitialPrice(INGREDIENT_PRICES.base)
        setTotalPrice(INGREDIENT_PRICES.base)
        const loadSummary = async (id) => {
            await firebase.ref('orderSummary/' + id).once('value')
                .then((data) => {
                    const ingredients = data.val().ingredients
                    setIngredients(ingredients)
                    Object.keys(ingredients).map(k => ingredients[k] >= 1 ? addPrice(INGREDIENT_PRICES[k] * ingredients[k]) : 0)
                    setLoading(false)

                })
                .catch(e => {
                    console.log(e)
                    setError(true)
                })
        }

        const loadIngredients = async () => {
            await firebase.ref('ingredients').once('value')
                .then(res => {
                    const data = res.val()

                    setIngredients(data)

                    Object.keys(data).map(ingredient => data[ingredient] >= 1 ? addPrice(INGREDIENT_PRICES[ingredient] * data[ingredient]) : 0)
                })
                .catch(error => {
                    console.log(error)
                    setError(true)
                })
        }

        if (match.params.id) {
            setLoading(true)
            loadSummary(match.params.id)
        } else {
            loadIngredients()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log("RE RENDERING BURGER BUILDER...")
        
    })

    const addIngredientHandler = (type, amount = 1) => {

        const priceAddition = INGREDIENT_PRICES[type]

        incIngredient(type, amount > 1 ? amount : undefined)
        addPrice(priceAddition)
    }

    const removeIngredientHandler = (type) => {
        if (ingredients[type] >= 1) {
            const priceMod = INGREDIENT_PRICES[type]
            decIngredient(type)
            subPrice(priceMod)
        }
    }



    const setOrderHandler = async (e) => {
        e.preventDefault()
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            customer: {
                name: 'Dilip Ramirez',
                address: {
                    street: 'ABC 123',
                    zipCode: '123123',
                    country: 'Chile'
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest'
        }

        setLoading(true)
        setDissappear(true)

        if (match.params.id) {
            await firebase.ref('/orderSummary/' + match.params.id).set({
                ...order
            })
                .then(res => {
                    history.push('/order/' + match.params.id)
                })
        } else {
            const name = await firebase.ref('orderSummary/').push(order).getKey()
            history.push("/order/" + name)
        }
    }

    const resetBurgerHandler = () => {
        resetBurger()
    }

    const disabledInfo = {
        ...ingredients
    }
    Object.keys(disabledInfo).map(k => disabledInfo[k] = disabledInfo[k] <= 0)

    let burger = error ? <p>Ingredients could not be loaded :(</p> : <Spinner />

    if (ingredients) {
        burger = (
            <React.Fragment>
                <Burger ingredients={ingredients} dissappear={dissappear} />
                <BurgerControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    setOrder={setOrderHandler}
                    total={totalPrice}
                    // modalState={showSummaryModal}
                    resetBurger={resetBurgerHandler}
                    disabled={disabledInfo} />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {loading && <Modal show><Spinner /></Modal>}
            {burger}
        </React.Fragment>
    )

}

// const mapStateToProps = (state) => {
//     return {
//         ...state
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         addPrice: (price) => dispatch({ type: actionTypes.ADD_PRICE, price }),
//         subPrice: (price) => dispatch({ type: actionTypes.SUBTRACT_PRICE, price }),
//         setIngredients: (ingredients) => dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients }),
//         resetBurger: () => dispatch({ type: actionTypes.RESET_INGREDIENTS }),
//         incIngredient: (ingredient, amount) => dispatch({ type: actionTypes.INC_INGREDIENT, ingredient, amount }),
//         decIngredient: (ingredient, amount) => dispatch({ type: actionTypes.DEC_INGREDIENT, ingredient, amount }),
//         setInitialPrice: (price) => dispatch({ type: actionTypes.SET_INITIAL_PRICE, price }),
//         setTotalPrice: (price) => dispatch({ type: actionTypes.SET_TOTAL_PRICE, price })
//     }
// }


export default withRouter(withErrorHandler(BurgerBuilder, axios))