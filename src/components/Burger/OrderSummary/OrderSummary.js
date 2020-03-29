import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import firebase from '../../../firebase/firebase'

import useFirebaseDoc from '../../../hooks/useFirebaseDoc'

import Burger from '../../Burger/Burger'
import OrderItem from './OrderItem/OrderItem'
import classes from './OrderSummary.module.css'
import actionTypes from '../../../store/actions'
import Spinner from '../../UI/Spinner/Spinner'

import INGREDIENT_PRICES from '../../../constants/ingredientPrices'

function OrderSummary(props) {

    const [ingredientList, setIngredientList] = useState({})
    const dispatch = useDispatch()
    const ref = firebase.ref('orderSummary/' + props.match.params.id)
    let { isLoading, data } = useFirebaseDoc(ref)

    const [orderListItems, setOrderListItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isSubscribed, setIsSubscribed] = useState(true)

    const [basePrice, setBasePrice] = useState(0)

    useEffect(() => {
        if (data && isSubscribed) {
            console.log(data)
            setIngredientList(data.ingredients)
            setTotalPrice(data.price)
        }
        return function () {
            if (data) {
                console.log("SHUTTING DOWN DATA FETCH")
                return setIsSubscribed(false)
            }
        }
    }, [data, dispatch, isSubscribed])
    
    useEffect(() => {
        const unitaryPrices = INGREDIENT_PRICES
        const setIngredients = (ingredients) => dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients })

        setIngredients(ingredientList)
        setBasePrice(unitaryPrices.base)

        const ingredientNames = Object.keys(ingredientList)
        Object.values(ingredientList).map((ingredient, i) => {
            if (ingredient >= 1) {
                let unitaryPrice = unitaryPrices[ingredientNames[i]]
                let totalItemPrice = Number((unitaryPrice * ingredient).toFixed(2))

                setOrderListItems(orderItem => orderItem.concat(<OrderItem
                    key={ingredientNames[i] + ingredient}
                    price={unitaryPrice}
                    total={totalItemPrice}
                    name={ingredientNames[i]}
                    quantity={ingredient} />))
            }
            return true
        })
    }, [ingredientList, dispatch])

    const handleCheckout = () => {
        console.log("TODO: BUILD HANDLE CHECKOUT")
    }

    const handleBack = (e) => {
        e.preventDefault()
        props.history.push('/builder/' + props.match.params.id)
    }

    if (isLoading) return <Spinner />

    return (
        <React.Fragment>
            <button className={classes.BackButton} onClick={handleBack}>Back</button>

            <h1 className={classes.ModalTitle}><span role="img" aria-label="burger">🍔</span>IT'S BURGER TIME!<span role="img" aria-label="burger">🍔</span></h1>
            <p className={classes.SummaryDetailsText}>Your delicious burger is just a tap away! <br />Here are the details:</p>
            {ingredientList && <Burger ingredients={ingredientList} style={{ width: 200, height: 150, marginBottom: 10 }} appear />}
            <ul>
                <OrderItem name="Base" price={basePrice} total={basePrice} quantity={1} />
                {orderListItems}
            </ul>
            <h1 className={classes.TotalPrice}>Your total is ${totalPrice && totalPrice.toFixed(2)}</h1>
            <button className={classes.CheckoutButton} onClick={handleCheckout}>CHECKOUT</button>
        </React.Fragment>
    )
}

export default withRouter(OrderSummary)