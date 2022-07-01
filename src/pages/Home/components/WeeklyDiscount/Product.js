import { Link } from '@mui/material'
import React, { Component } from 'react'
import { formatMoney } from '../../../../Helpers/GeneralHelper'

export default class Product extends Component {
    render() {
        return (
            <div className="col-6">
                <div className="product">
                    <div className="d-flex">
                        <img className="productCover"
                            src="https://ican-store.com/wp-content/uploads/2021/01/iphone-12-blue-select-2020-600x600.png"
                            alt="" />
                        <div className="productDetail">
                            <Link className="product-title" to="/">NIKE BASKETBALL SHOES</Link>
                            <span className="product-title-alt">LEBRON SOLDIER 14 BY YOU</span>
                            <span className="productPrice">{formatMoney(250.2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
