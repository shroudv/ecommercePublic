import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BasketContext } from '../../contexts/Basket/BasketContextProvider'
import ProductStandartComponent from '../../components/ProductStandartComponent';
import { useSnackbar } from 'notistack';
import Galleries from './components/Galleries';
import ProductDetails from './components/ProductDetails';
import ProductSinglePageLoader from '../../components/Loader/ProductSinglePageLoader';

export default function Single() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { addBasket } = useContext(BasketContext);
  const [getOtherProduct, setOtherProduct] = useState({ products: [] });
  const [getProduct, setProduct] = useState({
    product: {},
    selectedModel: null,
    selectedGallery: 0,
    quantity: 1,
  })

  const { slug } = useParams();

  const changeHandler = (e) => {
    const { value } = e.target;
    return value.slice(0, 1) > 0 && Number(value) > 0 ? setProduct({ ...getProduct, quantity: value }) : null
  }

  const setModelHandler = (id) => {
    return String(getProduct.selectedModel) === String(id) ? setProduct({ ...getProduct, selectedModel: null })
      : setProduct({ ...getProduct, selectedModel: id })
  }

  const addQuantity = (e) => {
    e.preventDefault();
    setProduct({ ...getProduct, quantity: Number(getProduct.quantity) + 1 })
  }

  const decQuantity = (e) => {
    e.preventDefault();
    return getProduct.quantity > 1 ? setProduct({ ...getProduct, quantity: Number(getProduct.quantity) - 1 }) : null
  }

  const showGallery = (e) => {
    setProduct({ ...getProduct, selectedGallery: e })
  }

  const addBasketHandler = () => {
    setProduct({ ...getProduct, });
    addBasket({ id: getProduct.product.id, quantity: getProduct.quantity, model: getProduct.selectedModel },
      enqueueSnackbar('Məhsul səbətə əlavə olundu', { variant: 'success' })
    );
  }

  /*eslint-disable */
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/products`).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        setOtherProduct({ products: data.result })
      } else {
        enqueueSnackbar('API Xətası', { variant: 'error' })
      }
    }).catch((error) => {
      return enqueueSnackbar('Digər Məhsullar API Xətası: ' + error.code, { variant: 'error' })
    });

    axios.get(`${process.env.REACT_APP_API_HOST}/products/${slug}`).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        Object.keys(data).length > 0 ? setProduct({ ...getProduct, product: data }) : null
      }
    }).catch((error) => {
      return enqueueSnackbar('Məhsul Səhifəsi API Xətası: ' + error.code, { variant: 'error' })
    });
  }, [slug])
  /*eslint-enable */

  return (

    <div className="wrapper container">
      <div className="productSingle row">
        {
          Object.keys(getProduct.product).length > 0 ?
            <>
              <div className="col-5">
                {
                  getProduct.product && getProduct.product.gallery && getProduct.product.gallery.length > 0 ? <Galleries galleries={getProduct.product.gallery} selectedGallery={getProduct.selectedGallery} showGallery={showGallery} /> : null
                }
              </div>
              <div className="col-7 productDetails px-4 pt-2">
                {
                  getProduct.product ?
                    <ProductDetails state={getProduct} actions={{ setModelHandler, decQuantity, addQuantity, changeHandler, addBasketHandler }} />
                    : null
                }
              </div>
            </>
            : <ProductSinglePageLoader />
        }

      </div>
      {
        getOtherProduct.products.length > 0 ?
          <div className="otherProducts">
            <h3>Digər Məhsullar</h3>
            <div className="products row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
              {
                getOtherProduct ?
                  getOtherProduct.products.map((product, i) => {
                    return product.slug !== getProduct.product.slug ?
                      <ProductStandartComponent key={i} product={product} />
                      : null
                  })
                  : null
              }
            </div>
          </div>
          : null
      }
    </div>
  )
}