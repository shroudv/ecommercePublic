import React, { Component } from 'react'
import MuiDrawer from '../components/Basket/MuiBasketDrawer'
import AuthProvider from '../contexts/AuthProvider'
import BasketContextProvider from '../contexts/Basket/BasketContextProvider'
import CategoryContextProvider from '../contexts/Basket/CategoryContextProvider'
import Footer from './Footer'
import Header from './Header'

export default class Master extends Component {
    render() {
        return (
            <>
                <AuthProvider>
                    <CategoryContextProvider>
                        <BasketContextProvider>
                            <MuiDrawer>
                                <Header />
                                {this.props.children}
                                <Footer />
                            </MuiDrawer>
                        </BasketContextProvider>
                    </CategoryContextProvider>
                </AuthProvider>
            </>
        )
    }
}
