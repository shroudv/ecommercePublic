import React, { useEffect } from 'react'
import ProductStandartComponent from '../../components/ProductStandartComponent'
import Sliders from './components/Slider/Sliders'
import WeeklyDiscount from './components/WeeklyDiscount/WeeklyDiscount'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useState } from 'react';
/*eslint-disable */
export default function Index() {
  const [getProducts, setProduct] = useState({ products: [] });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/products`)
      .then((res) => res.status === 200 ? setProduct({ products: res.data.result }) : null)
      .catch((error) => enqueueSnackbar('Məhsullar API Xətası: ' + error.code, { variant: 'error' }));
  }, [])

  return (
    <>
      <Sliders />
      <section>
        <div className="products_wrapper container">
          <h2 className="section-title">POPULYAR MƏHSULLAR</h2>
          <div className="products row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
            {
              getProducts.products.map((product, i) => <ProductStandartComponent key={i} grid="3" product={product}/>)
            }
          </div>
        </div>
      </section>
      {/* <WeeklyDiscount /> */}
    </>
  )
}