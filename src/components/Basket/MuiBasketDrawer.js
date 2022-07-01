import React, { useEffect, useState, useContext } from 'react'
import { Drawer } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import { BasketContext } from '../../contexts/Basket/BasketContextProvider';
import Product from './Product';
import TotalAmountComponent from './TotalAmountComponent';
import { useSnackbar } from 'notistack';

export const MuiDrawerContext = React.createContext();

export default function MuiDrawer(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { setBasket, getBasket } = useContext(BasketContext);
    const [getOpen, setOpen] = useState(false);
    const [getProducts, setProducts] = useState({ products: [] });

    /*eslint-disable */
    useEffect(() => {
        const basketIds = getBasket.products.map((prd, i) => i === 0 ? `?id[]=${prd.id}` : `&id[]=${prd.id}`)
        if (basketIds.length > 0) {
            axios.get(`${process.env.REACT_APP_API_HOST}/products/${basketIds.join('')}`).then((res) => {
                if (res.status = 200) {
                    const { data } = res;
                    setProducts({ ...getProducts, products: data.result })
                }
            }).catch((error) => {
                return enqueueSnackbar('Səbət API Xətası: ' + error.code, { variant: 'error' })
            });
        }
    }, [getBasket])
    /*eslint-enable */

    const quantityChangeHandler = (id, quantity) => {
        quantity.preventDefault();
        const { value } = quantity.target;
        if (value > 0) {
            const a = getBasket.products.map((prev) => id === prev.id ? ({ ...prev, ...prev[id], quantity: value ?? 0 }) : prev)
            setBasket((prev) => ({ ...prev, products: a }))
        }
    }

    const addQuantity = (id, quantity) => {
        quantity.preventDefault();

        const a = getBasket.products.map((prev) => {
            return String(id) === String(prev.id) ? ({ ...prev, ...prev[id], quantity: Number(prev.quantity) + 1 }) : prev;
        })

        setBasket((prev) => ({ ...prev, products: a }))
    }

    const decQuantity = (id, quantity) => {
        quantity.preventDefault();

        const a = getBasket.products.map((prev) => {
            return prev.quantity > 1 ?
                id === prev.id ?
                    ({ ...prev, ...prev[id], quantity: Number(prev.quantity) - 1 })
                    :
                    prev
                : prev
        })

        setBasket((prev) => ({ ...prev, products: a }))
    }

    const deleteProductInBasket = (id, e) => {
        e.preventDefault();

        const newBasket = getBasket.products.filter(product => product.id !== id)
        const newProducts = getProducts.products.filter(product => product.id !== id)

        setBasket(
            { ...getBasket, products: newBasket },
            enqueueSnackbar('Məhsul səbətdən silindi', { variant: 'success' }))
        setProducts({ ...getProducts, products: newProducts })
    }


    const clearBasket = (e) => {
        e.preventDefault();

        setBasket({ ...getBasket, products: [] }, enqueueSnackbar('Səbətiniz təmizləndi', { variant: 'success' }))
        setProducts({ ...getProducts, products: [] })
    }

    let amount = 0;
    getProducts.products.map(prod => {
        const basketItem = getBasket.products.filter(prd => prd.id == prod.id ? prd : null)
        return basketItem.length > 0 ? amount += Number(prod.price) * Number(basketItem[0].quantity) : 0
    });

    const taxPrice = Number(amount * 18 / 100);
    const totalAmount = Number(taxPrice) + Number(amount);
    return (
        <>
            <MuiDrawerContext.Provider value={{ getOpen, setOpen }}>
                {
                    props.children
                }
                {
                    <Drawer anchor='right' open={getOpen} onClose={() => setOpen(false, setBasket({ ...getBasket, isShowBasket: false }))}>
                        <Box p={8} width={`${getProducts.products.length > 0 ? '950px' : '450px'}`}>
                            <div className="basketSide">
                                <div className="basketProducts">
                                    <h2 className='basketTitle mb-4'>Səbətim</h2>
                                    <div className="products">
                                        {
                                            getProducts.products.length > 0 ?
                                                getProducts.products.map((product, i) => {
                                                    const basketDetails = getBasket.products.filter(basketProduct => {
                                                        return product.id === basketProduct.id ? basketProduct : null
                                                    });
                                                    return (
                                                        <Product key={i} product={product}
                                                            basketDetail={basketDetails ?? null} iNum={i}
                                                            actions={{ addQuantity, decQuantity, deleteProductInBasket, quantityChangeHandler }}
                                                        />
                                                    )
                                                })
                                                :
                                                <div className="notFound text-center text-muted">
                                                    <i className="fa-regular fa-basket-shopping-simple fa-4x text-muted"></i>
                                                    <h2 className='title'>Səbətiniz Boşdur</h2>
                                                </div>
                                        }
                                    </div>
                                </div>
                                {
                                    getBasket.products.length > 0 ?
                                        <TotalAmountComponent amount={amount} taxPrice={taxPrice} totalAmount={totalAmount} clearBasket={clearBasket} /> : null
                                }
                            </div>
                        </Box>
                    </Drawer>
                }
            </MuiDrawerContext.Provider>
        </>
    )
}