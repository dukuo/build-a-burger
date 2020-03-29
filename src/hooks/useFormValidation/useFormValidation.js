import React from 'react'

/*

    Uber simplified and incomplete form validation hook inspired by React-hook-form.
    Made for educational purposes only. 

*/

const useFormValidation = () => {

    const { useRef, useState, useCallback } = React
    const fieldRefs = useRef({})
    const errorMessages = useRef({})
    const isUnMount = useRef(false)

    const [, render] = useState()

    const defaultValues = {}
    const defaultValuesRef = useRef(defaultValues)
    
    const pushError = (opts) => {
        errorMessages.current[opts.name] = true
    }
    const errors = errorMessages.current
    
    const reRender = useCallback(() => {
        // if(!isUnMount.current) {
        //     render({})
        // }
    }, [])
    
    const handleSubmit = useCallback(
        (cb) => e => {
            const validation = []
           if(e) {
               e.preventDefault()
               e.persist()
               Object.values(fieldRefs.current).forEach(field => {
                   let isValid = []
                   const { options, ref: { value, type, name} } = field
    
                   if(options) {
                        if(options.required && (!value || value === '')) {
                            isValid.push(false)
                        }
                        if(options.min && !isNaN(value) && value <= options.min) {
                            console.log("MIN ERROR")
                            isValid.push(false)
                        }
                        if(options.max && !isNaN(value) && value >= options.max) {
                            console.log(name, " DIDNT PASSED MAX with ", value, " >= ", options.max)
                            isValid.push(false)
                        }
                        if(options.validate && typeof options.validate === 'function' && !options.validate(value)) {
                            console.log("VALIDATION FUNCTION FAILED", options.validate, value)
                            isValid.push(false)
                        }
                    }
                    
                    const isFinallyValid = isValid.reduce((a, c) => a & c, true)
                    validation.push({
                        name: name,
                        valid: !!isFinallyValid
                    })
                    if(!isFinallyValid) {
                        pushError({ name })
                        // reRender()
                    }
                    console.log(!!isFinallyValid)
               })
    
               if(validation.filter(entry => entry.valid === false).length === 0) {
                   console.log("form is valid!")
                   const data = refsToObj(fieldRefs.current)
                   cb(data)
               }
            }
        }, [reRender]
    )

    const refsToObj = (fields) => {
        const data = {}
        Object.entries(fields).forEach(([name, field]) => {
            console.log(name, field)
            const { inputName, type, value } = field.ref
            data[name] = {
                type,
                value
            }
        })
        return data
    }


    const register = useCallback(
        (ref, config) => {
            
            const fields = fieldRefs.current

            const { name, type, value } = ref

            fields[name] = {
                options: config,
                ref
            }


        }, [defaultValuesRef, fieldRefs]
    )

    return { handleSubmit, register, errors }
    
}

export default useFormValidation