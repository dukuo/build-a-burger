import React from 'react'
import { useSelector } from 'react-redux'

import BuildControl from './BuildControl/BuildControl'
import BurgerPriceControl from './BurgerPriceControl/BurgerPriceControl'
import classes from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
function BuildControls(props) {
    const { totalPrice } = useSelector(state => state)
    const dk = Object.keys(props.disabled)
    const disabledBtn = dk.reduce((acc, curr) => acc + (+props.disabled[curr]), 0) === Object.keys(props.disabled).length
    return (
        <div className={classes.BuildControlsHolder}>
            <BurgerPriceControl 
                        price={totalPrice}
                    />
            <div className={classes.BuildControls}>
                { controls.map( (ctrl, i) => 
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        added={ () => props.ingredientAdded(ctrl.type) }
                        removed={ () => props.ingredientRemoved(ctrl.type) }
                        disabled={props.disabled[ctrl.type]}
                        modal={props.modalState}
                        />
                )}
            </div>
            <div className={classes.ButtonHolder}>
                <button className={classes.ResetButton} onClick={props.resetBurger}>RESET</button>
                <button onClick={(e) => disabledBtn || props.modalState ? e.preventDefault() : props.setOrder(e) } disabled={disabledBtn} className={classes.OrderButton}>ORDER NOW</button>
            </div>
        </div>
    )
}

export default BuildControls