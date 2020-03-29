import React, { useEffect } from 'react'
import Input from '../../../components/UI/Input'
import useFormvalidation from '../../../hooks/useFormValidation'

function CheckoutForm (props) {
    const { handleSubmit, register, errors } = useFormvalidation()

    useEffect(() => {
        console.log("re rendering")

    })
    
    const onSubmit = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="email" name="something" label="Whatever" ref={register} />
            <Input type="text" name="somethisng" ref={(ele) => register(ele, { min: 3, max: 10, required: true})} errors={errors} required />
            <Input type="text" name="asd" ref={(ele) => register(ele, {
                    required: true,
                    validate: (str) => /abc/.test(str)
                })} 
                errormessage="Input is required"
                errors={errors} required />
                {errors.asd && <p>ERROR IN ASD</p>}

            <button type="submit"> SEND</button>
        </form>
    )
}

export default CheckoutForm