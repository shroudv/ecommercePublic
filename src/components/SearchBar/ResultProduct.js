import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CategoryContext } from '../../contexts/Basket/CategoryContextProvider'
import { formatMoney } from '../../Helpers/GeneralHelper'

export default function ResultProduct(props) {
    const { normalCategories } = useContext(CategoryContext)
    const findParent = normalCategories.find((cat) => cat.id === props.product.category.parentId)

    const productUrl = `/catalog/${findParent ? findParent.slug : null}/${props.product.category.slug}/${props.product.slug}`;
    return (
        <div className="product">
            <div className="productCover">
                <Link className='productCover' to={productUrl}><img src={props.product.thumb} alt={props.product.title} /></Link>
            </div>
            <div className="productContent">
                <Link to={productUrl} className="productTitle">{props.product.title}</Link>
                <span className='productPrice'>{formatMoney(props.product.price)}</span>
            </div>
        </div>
    )
}
