import React from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../Helpers/GeneralHelper'

export default function ProductStandartComponent(props) {

    const productUrl = `/catalog${props.product.url.join('')}/${props.product.slug}`;

    return (
        <div className={`${props.grid === 3 ? 'col-xl-4' : 'col-xl-3'} col-sm-6 col-12`}>
            <div className="product">
                <div className='productDetails'>
                    <Link className="product-title" to={productUrl}>{props.product.title}</Link>
                    <span className="product-title-alt d-block">{props.product.brand}</span>

                </div>
                <div className="productModels">
                    <Link to={productUrl}>
                        <img className="productCover" src={props.product.thumb} alt={props.product.title} />
                    </Link>
                    <div className="colors">
                        {
                            props.product.colors ? props.product.colors.map((color, i) => {
                                return <div key={i} className="color" style={{ backgroundColor: color._color }}></div>
                            })
                                : null
                        }
                    </div>
                </div>
                <div className="productAction">
                    <span className="productPrice">{formatMoney(props.product.price)}</span>
                    {
                        <Link className="btn" to={productUrl}>Daha Ətraflı</Link>
                    }
                </div>
            </div>
        </div>
    )
}

ProductStandartComponent.defaultProps = {
    title: null,
    price: 0,
    colors: []
}
