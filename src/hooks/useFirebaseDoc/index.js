import { useState, useEffect } from 'react'

export default (ref) => {
    const [docState, setDocState] = useState({
        isLoading: true,
        data: null
    });
    useEffect(() => {
        ref.once('value', snap => {
            if(snap) {
                setDocState({
                    isLoading: false,
                    data: snap.val()    
                });
            }
        });
        return function() {
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return docState;
}