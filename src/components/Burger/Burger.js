import React, { useEffect, useState } from 'react'
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

function Burger(props) {
    const { appear = undefined, ingredients, dissappear } = props

    const [ingredientComponents, setIngredientComponents] = useState([])

    const [showIngredientMessage, setShowIngredientMessage] = useState(false)
    
    const [transAnim, setTransAnim] = useState({})
    
    useEffect(() => {
        if(appear) {
            setTransAnim({
                animation: classes.appear + ' .7s ease-out',
                animationPlayState: 'running'
            })
        }
    
        if(dissappear) {
            setTransAnim({
                animation: classes.dissappear + ' .3s',
                animationPlayState: 'running'
            })
        }
    }, [appear, dissappear])
    
    useEffect(() => {
        setShowIngredientMessage(false)
        const tmpList = []
        Object.keys(ingredients)
            .map(ingKey => [...new Array(ingredients[ingKey])].map( () => tmpList.push(ingKey)))
        
        setIngredientComponents(tmpList)
    }, [ingredients])

    useEffect(() => {
        
        setShowIngredientMessage(ingredientComponents.length === 0)

    }, [ingredientComponents])

    return (
        <div className={classes.Burger} style={{...props.style, ...transAnim}}>
            <BurgerIngredient type="bread-top" withAdditional="seeds1 seeds2"/>
                { showIngredientMessage && <h1>Add some ingredients!</h1>}
                { ingredientComponents && ingredientComponents.map( (a, i) => <BurgerIngredient key={a+i} type={a} />) }    
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger