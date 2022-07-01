import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function AddBasket(props) {

    return (
        <div className="mainItems d-flex">
            <div className="quantity d-flex gap-3">
                <Link to="/" className='btn btn-outline-primary minus' onClick={(e) => props.actions.decQuantity(e)}>
                    <i className="fas fa-minus"></i>
                </Link>
                <input type="number" min={1} value={props.state.quantity} onChange={(e) => props.actions.changeHandler(e)} />
                <Link to="/" className='btn btn-outline-primary plus' onClick={(e) => props.actions.addQuantity(e)}>
                    <i className="fas fa-plus"></i>
                </Link>
            </div>
            {
                props.actions.validateProduct(props.product.id)
                    ?
                    <button className="btn-rounded-outline-primary buyButton" onClick={() => props.actions.setOpen(true)}>Məhsulu Sifariş Et</button>
                    :
                    <button
                        className="btn-rounded-outline-primary buyButton"
                        onClick={() => props.actions.addBasketHandler()}
                    >Səbətə Əlavə Et</button>
            }
            <div className="productTools mx-3 d-flex gap-1">
                <Link to="/" className='btn border d-flex align-items-center'><i className="fa-regular fa-code-compare"></i></Link>
                <Link to="/" className='btn border d-flex align-items-center'><i className="fa-regular fa-heart"></i></Link>
            </div>
        </div>
    )
}
