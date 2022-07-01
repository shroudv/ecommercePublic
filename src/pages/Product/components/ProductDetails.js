import React, { useContext } from 'react'
import { MuiDrawerContext } from '../../../components/Basket/MuiBasketDrawer';
import { BasketContext } from '../../../contexts/Basket/BasketContextProvider';
import { formatMoney } from '../../../Helpers/GeneralHelper'
import AddBasket from './AddBasket';
import SelectModel from './SelectModel';


export default function ProductDetails(props) {
    const { setOpen } = useContext(MuiDrawerContext);
    const { validateProduct } = useContext(BasketContext);
    const product = props.state.product
    return (
        <>
            <h3 className='productTitle'>{product.title ?? 'NaN'}</h3>
            <div className='productRating'>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-solid fa-star-sharp"></i>
                <i className="fa-regular fa-star-sharp"></i>
                <span>(102) Dəyərləndirmə</span>
            </div>
            <div className="productMeta py-2 d-flex gap-3 mb-3">
                <span className="btn btn-sm btn-outline-primary">Stokda Mövcuddur</span>
            </div>
            <div className="mainDetails">
                <div className="mainItemsLeft d-flex align-items-center mb-2">
                    <span className='price'>{formatMoney(product.price)}</span>
                    <span className="price del">{formatMoney(2500)}</span>
                    <span className="btn btn-sm btn-primary">20% Endirim</span>
                </div>
            </div>
            <div className="productContent my-4">
                <p>{product.content}</p>
            </div>
            {
                product.models.length > 0 ?
                    <SelectModel
                        models={product.models}
                        state={props.state}
                        setModelHandler={props.actions.setModelHandler} />
                : null
            }
            <AddBasket
                product={product}
                state={props.state}
                actions={{
                    decQuantity: props.actions.decQuantity,
                    changeHandler: props.actions.changeHandler,
                    addQuantity: props.actions.addQuantity,
                    addBasketHandler: props.actions.addBasketHandler,
                    setOpen,
                    validateProduct
                }} />
        </>
    )
}


ProductDetails.defaultProps = {
    product: {
        title: 'sa'
    },
    title: 'sa'
}