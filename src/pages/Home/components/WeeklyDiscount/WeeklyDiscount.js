import React, { Component } from 'react'
import Product from './Product'

export default class WeeklyDiscount extends Component {
    render() {
        return (
            <section>
                <div className="discount-side container d-flex">
                    <div className="head">
                        <h3>Həftəlik Endirimlər</h3>
                        <p className="my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                        <span className="discount-date">05:42:19:54</span>
                    </div>
                    <div className="body row">
                        <Product />
                        <Product />
                    </div>
                </div>
            </section>
        )
    }
}
