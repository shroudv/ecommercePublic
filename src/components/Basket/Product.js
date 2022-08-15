import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/Basket/CategoryContextProvider';
import { formatMoney } from '../../Helpers/GeneralHelper';
export default function Product(props) {
    // const { enqueueSnackbar } = useSnackbar();

    const { normalCategories } = useContext(CategoryContext)


    const productUrl = `/catalog${props.product.url.join('')}/${props.product.slug}`;

    return (
        <div className="basketProduct gap-2">
            <div className="productHead">
                <div className="productCover me-3">
                    <Link to={productUrl}>
                        <img src={props.product.thumb} alt={props.product.title} />
                    </Link>
                </div>
                <div className="productDetails m-0">
                    <Link to={productUrl}>{props.product.title}</Link>
                    <p>
                        {
                            props.product.models && props.product.models.length > 0 ?
                                props.product.models.map(mod =>
                                    mod.id == props.basketDetail.model ? mod.title : null
                                )
                                : null
                        }
                    </p>
                </div>
            </div>
            <div className="productAction">
                <div className='quantitySide'>
                    <div className="quantity d-flex gap-3">
                        <Link to="/" className='btn btn-outline-primary minus' onClick={(e) => props.actions.decQuantity(props.product.id, e)}>
                            <i className="fas fa-minus"></i>
                        </Link>
                        {
                            props.basketDetail.length > 0 ? <input type="number" min={1} value={props.basketDetail[0].quantity} onChange={(e) => props.actions.quantityChangeHandler(props.product.id, e)} /> : null
                        }
                        <Link to="/" className='btn btn-outline-primary plus' onClick={(e) => props.actions.addQuantity(props.product.id, e)}>
                            <i className="fas fa-plus"></i>
                        </Link>
                    </div>
                </div>
                <div className="productPrice">
                    <h5>{formatMoney(props.product.price)}</h5>
                </div>
            </div>

            <div className="productToolbar">
                <Link to='#' className='btn btn-outline-secondary' onClick={(e) => props.actions.deleteProductInBasket(props.product.id, e)}><i className="fa-regular fa-trash"></i></Link>
            </div>
        </div>
    )


}
Product.defaultProps = {
    product: {
        title: 'NaN',
        price: 0
    }
}