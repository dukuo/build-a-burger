import React, { useEffect, useState } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrapperComponent, axios) => {

    return props => {
        const [error, setError] = useState(null)
        
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null)
            return req
        })
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error)
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        }, [reqInterceptor, resInterceptor])

        const errorConfirmedHandler = () => {
            setError(null)
        }

        return (
            <React.Fragment>
                <Modal
                    show={error}
                    close={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </React.Fragment>
        )
    }
    
}

export default withErrorHandler