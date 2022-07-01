import axios from 'axios';
import React, { useState, useCallback } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { loaderAnimation } from '../../Helpers/GeneralHelper';
import ResultProduct from './ResultProduct';
import { useSnackbar } from 'notistack';
import _debounce from 'lodash/debounce';


/*eslint-disable */

export default function SearchBarComponent() {
    const { enqueueSnackbar } = useSnackbar();
    const [getLoader, setLoader] = useState(false);
    const [getForm, setForm] = useState({ query: "" });
    const [getResult, setResult] = useState({ isShow: false, results: [] });
    const location = useLocation();
    const ref = useRef(null)
    const minSearchCharacter = 3;

    const debounceFn = useCallback(
        _debounce((e) => {
            const { value } = e.target;
            setForm(getForm => ({ ...getForm, query: value }));
        }, 1000),
        []
    );

    useEffect(() => { setForm({ query: '' }) }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            ref.current && !ref.current.contains(event.target) ? setResult({ ...getResult, isShow: false }) : setResult({ ...getResult, isShow: true })
        };

        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, [getResult]);

    // const changeHandler = (e) => {
    //     _debounce
    // };

    useEffect(() => {
        const searchHandler = () => {
            if (getForm.query.length >= minSearchCharacter) {
                axios.get(`${process.env.REACT_APP_API_HOST}/products?search=${getForm.query}`).then((res) => {
                    if (res.status === 200) {
                        const { data } = res;
                        setLoader(true)
                        setTimeout(() => setResult({ ...getResult, results: data.result }, setLoader(false)), 500)
                    }
                }).catch((error) => {
                    return enqueueSnackbar('Axtarış Məhsul API Xətası: ' + error.code, { variant: 'error' })

                });
            }
        }
        searchHandler();
    }, [getForm])

    return (
        <div className="searchSide">
            <input type="text"
                // ref={ref} 
                placeholder="Axtardığınız Məhsul..."
                // value={getForm.query} 
                onChange={(e) => debounceFn(e)} />
            <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
            <div className={`resultSide${getResult.isShow === true && getForm.query.length >= minSearchCharacter ? ' active' : ''}`}>
                <div className="results">
                    {
                        getLoader === true ? loaderAnimation() : getResult.results.map((product, i) => <ResultProduct key={i} product={product} />)
                    }
                    {
                        getLoader !== true && getResult.results.length === 0 ?
                            <div className="notFound text-center text-muted m-0 my-4">
                                <span className='title display-4'>Axtardığınız məhsul tapılmadı</span>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}