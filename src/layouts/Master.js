import React, { Component } from 'react'
import MuiDrawer from '../components/Basket/MuiBasketDrawer'
import BasketContextProvider from '../contexts/Basket/BasketContextProvider'
import CategoryContextProvider from '../contexts/Basket/CategoryContextProvider'
import Footer from './Footer'
import Header from './Header'

export default class Master extends Component {
    render() {
        return (
            <>
                <CategoryContextProvider>
                    <BasketContextProvider>
                        <MuiDrawer>
                            <Header />
                            {this.props.children}
                            <Footer />
                        </MuiDrawer>
                    </BasketContextProvider>
                </CategoryContextProvider>
            </>
        )
    }
}
