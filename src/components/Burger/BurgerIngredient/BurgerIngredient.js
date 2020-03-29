import React, { useEffect, useState } from 'react'
import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'

function BurgerIngredient(props) {
    const { type, withAdditional = null } = props
    // let ingredient = null
    const [pickedClassName, setPickedClassName] = useState('')
    const [extras, setExtras] = useState([])
    
    useEffect(() => {
        const cls = ['bread-bottom', 'bread-top', 'meat', 'cheese', 'bacon', 'salad', 'seeds1', 'seeds2']
        const tmpExtras = []

        const formatClass = (str = '', sep, joinSep = '') => str.split(sep).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(joinSep)
    
        let picked = cls.indexOf(type)
    
        let additionalCls = !!withAdditional ? withAdditional.split(' ').map(w => cls.indexOf(w)) : null
        
        if (picked !== -1) {   
            picked = formatClass(cls[picked], '-')
            
            setPickedClassName(classes[picked]) 

            if( !!additionalCls && additionalCls.length > 0 ) {
                Object.values(additionalCls).forEach(ac => tmpExtras.push(formatClass(cls[ac], ' ', '')))
                setExtras(tmpExtras)
            }
        }
    }, [type, withAdditional])
    
    return (
        <div className={pickedClassName}>
            { extras && extras.map((e, i) => <div key={`additional${i}`} className={classes[e]}></div>) }
        </div>
    )
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
    withAdditional: PropTypes.string
}

export default BurgerIngredient