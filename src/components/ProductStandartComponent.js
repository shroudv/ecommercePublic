import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CategoryContext } from '../contexts/Basket/CategoryContextProvider';
import { formatMoney } from '../Helpers/GeneralHelper'
export default function ProductStandartComponent(props) {
    const { normalCategories } = useContext(CategoryContext)
    const findParent = normalCategories.find((cat) => {
        return cat.id === props.product.category.parentId
    })

    const productUrl = `/catalog${props.product.url.join('')}/${props.product.slug}`;

    return (
        <div className={`${props.grid === 3 ? 'col-4' : 'col-3'}`}>
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
