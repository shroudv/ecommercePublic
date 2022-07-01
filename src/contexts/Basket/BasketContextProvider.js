import React, { useEffect, useState } from 'react'
export const BasketContext = React.createContext();

function BasketContextProvider(props) {

    const [getBasket, setBasket] = useState({ products: [] });
    /*eslint-disable */
    useEffect(() => {
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(getBasket.products));
        }
        setBasket({
            ...getBasket,
            products: JSON.parse(localStorage.getItem('items'))
        })
    }, [])
    /*eslint-enable */

    const validateProduct = (e) => {
        const detect = getBasket.products.filter(product => Number(product.id) === Number(e) ? true : false)
        return detect.length ? true : false
    }

    const addBasket = (e) => {
        const { id, model, quantity } = e;

        setBasket(prevState => ({
            ...prevState,
            products: [
                ...prevState.products,
                { id, model, quantity }
            ]
        }))
    }

    /*eslint-disable */
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(getBasket.products));
    }, [addBasket])
    /*eslint-enable */

    return (
        <BasketContext.Provider value={{ getBasket, validateProduct, addBasket, setBasket }}>
            {props.children}
        </BasketContext.Provider>
    )
}
export default BasketContextProvider