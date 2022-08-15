import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CategoryContext } from '../../contexts/Basket/CategoryContextProvider'
import ProductStandartComponent from '../../components/ProductStandartComponent'
import ProductGenLoader from '../../components/Loader/ProductGenLoader';
import { useSnackbar } from 'notistack';
import LabelSingle from './components/LabelSingle';
export default function Index() {

    const _categories = useContext(CategoryContext).categories;
    const categoryNormal = useContext(CategoryContext).normalCategories;
    const [getCategory, setCategory] = useState({ categories: [], selectedCategory: '', showMore: 0 });
    const [getProduct, setProduct] = useState({ products: [], currentPage: 1, maxPage: 1 });
    const [getLoader, setLoader] = useState(false);
    const [getModels, setModels] = useState({ models: [] });
    const [getForm, setForm] = useState({ min: '', max: '', size: [], colors: [] })

    const { topcategory, subcategory } = useParams();
    const location = useLocation();

    const third = new URLSearchParams(location.search).get('third')
    const { enqueueSnackbar } = useSnackbar();

    let lastCat;
    if (!subcategory && !third) {
        lastCat = topcategory
    } else if (!third && subcategory) {
        lastCat = subcategory
    } else {
        lastCat = third
    }

    /*eslint-disable */

    useEffect(() => {
        let lastCat;
        if (!subcategory && !third) {
            lastCat = topcategory
        } else if (!third && subcategory) {
            lastCat = subcategory
        } else {
            lastCat = third
        }

        setCategory({ ...getCategory, categories: _categories })
        categoryNormal.filter((cat) => cat.slug == lastCat ? setCategory((prev) => ({ ...prev, selectedCategory: cat })) : null)
        setLoader(true)

        getCategory.selectedCategory ?
            axios.get(`${process.env.REACT_APP_API_HOST}/products/?category=${getCategory.selectedCategory.id}&page=${getProduct.currentPage}`)
                .then(({ data }) => {
                    setProduct({ ...getProduct, products: data.result, maxPage: data.lastPage })
                    setLoader(false)
                }).catch(err => {
                    return enqueueSnackbar('Kategoriya API Xətası: ' + err.code, { variant: 'error' })
                })
            : null
    }, [categoryNormal, _categories, location, getCategory.selectedCategory, getProduct.currentPage])


    useEffect(() => {
        setCategory((prev) => ({ ...prev, showMore: false }))
    }, [lastCat])


    useEffect(() => {
        let arr = []
        getProduct.products.map((product) => {
            product.models.map(model => {
                const unique = [...new Set(arr.map(item => item.title))]
                unique.includes(model.title) ? null : arr.push(model)
            })
        })

        setModels((prev) => ({ ...prev, models: arr }))
    }, [getProduct.products])

    useEffect(() => {
        setLoader(true)
        getCategory.selectedCategory ?
            axios.get(`${process.env.REACT_APP_API_HOST}/products/?category=${getCategory.selectedCategory.id}`, {
                params: { min: getForm.min, max: getForm.max, size: getForm.size, }
            }).then(({ data }) => {
                setProduct((prev) => ({ ...prev, products: data.result }))
                setLoader(false)
            }).catch(err => enqueueSnackbar('Kategoriya API Xətası: ' + err.code, { variant: 'error' }))
            : null
    }, [getForm, getCategory.selectedCategory])

    const categoryChangeHandler = (data) => setCategory({ ...getCategory, selectedCategory: data });

    /*eslint-enable */

    const getChilds = (categoryArr, prevArra) => {
        let res;
        categoryArr.children && categoryArr.children.length > 0 ?
            res = categoryArr.children.map((cat, i) => {
                const bannerLink = `/catalog${prevArra ? '/' + prevArra.slug : ''}/${categoryArr.slug}/${prevArra && prevArra.parentId == null ? '?third=' + cat.slug : cat.slug}`;
                return (
                    <div key={i} className='category'>
                        <Link to={bannerLink} onClick={() => categoryChangeHandler(cat)} className={`categoryTitle${subcategory === cat.slug || subcategory && third === cat.slug ? ' active' : ''}`}>• {cat.title} {cat.children ? <i className="fa-solid fa-arrow-right"></i> : null}</Link>
                        <div className={`subList${subcategory === cat.slug || subcategory && third === cat.slug ? ' active' : ''}`}>
                            {getChilds(cat, categoryArr)}
                        </div>
                    </div>
                )
            })
            : res = null
        return res;
    }

    const setSizeHandler = (size) => {
        if (getForm.size.includes(size.slug)) {
            const find = getForm.size.filter(siz => siz !== size.slug ? true : false)
            setForm({ ...getForm, size: find })
        } else {
            setForm({ ...getForm, size: [...getForm.size, size.slug] })
        }
    }

    return (
        <div className='wrapper container'>
            <div className="row">
                <div className="col-xl-3 col-12 barSide">
                    <div className="column">
                        <h5>Bütün Kategoriyalar</h5>
                        <div className="categoryList">
                            {
                                getCategory.categories.map((category, i) => {
                                    return (
                                        <div key={i} className="category">
                                            <Link to={`/catalog/${category.slug}`} onClick={() => categoryChangeHandler(category)} className={`categoryTitle ${category.slug === topcategory ? ' active' : ''}`}>{category.title} {category.children ? <i className="fa-solid fa-arrow-right"></i> : null}</Link>
                                            <div className={`subList${category.slug === topcategory ? ' active' : ''}`}>
                                                {getChilds(category)}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="column">
                        <h5>Filterlər</h5>
                        <div className="filterList">
                            <div className="filter form-group">
                                <div className="headSide">
                                    <label className='title' htmlFor="">Qiymət Aralığı</label>
                                    <span className='action' htmlFor=""><i className="fa-regular fa-arrow-down"></i></span>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" placeholder='min' value={getForm.min} onChange={(e) => setForm({ ...getForm, min: e.target.value })} />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" placeholder='max' value={getForm.max} onChange={(e) => setForm({ ...getForm, max: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="filter">
                                <div className="headSide">
                                    <label className='title' htmlFor="">Ölçülər</label>
                                    <span className='action' htmlFor=""><i className="fa-regular fa-arrow-down"></i></span>
                                </div>
                                <div className="sizes">
                                    {
                                        getModels.models.map((model, i) => {
                                            return (
                                                <div key={i}
                                                    onClick={() => setSizeHandler(model)}
                                                    className={`size${getForm.size.find(_size => _size === model.slug) ? ' active' : ''}`}>{model.title}</div>)
                                        })

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-12 productList ">
                    <div className="categoryBanner">
                        <div className="bannerCover">
                            <img src="https://st3.depositphotos.com/2234329/18161/i/1600/depositphotos_181612646-stock-photo-similar-to-iphone-x-smartphones.jpg" alt="" />
                        </div>
                        <div className="bannerContent">
                            <h1 className='title mb-3'>{getCategory.selectedCategory.title}</h1>
                            <p className='content'>{getCategory.selectedCategory.content}</p>
                        </div>
                    </div>
                    <div className="categoryLabels row mb-5">
                        {
                            getCategory.selectedCategory && getCategory.selectedCategory.children ?
                                getCategory.selectedCategory.children.map((child, i) => {
                                    const bannerLink = `/catalog/${topcategory}${subcategory ? `/${subcategory}` : ''}${subcategory ? '?third=' + child.slug : '/' + child.slug}`;
                                    return (
                                        getCategory.showMore ?
                                            <LabelSingle
                                                key={i} link={bannerLink}
                                                params={{ topcategory, subcategory, child }}
                                                categoryChangeHandler={categoryChangeHandler}
                                            />
                                            :
                                            i < 3 ?
                                                <LabelSingle
                                                    key={i} link={bannerLink}
                                                    params={{ topcategory, subcategory, child }}
                                                    categoryChangeHandler={categoryChangeHandler}
                                                />
                                                : null
                                    )
                                })
                                : null
                        }
                        {
                            getCategory.selectedCategory.children && getCategory.selectedCategory.children.length > 3 && getCategory.showMore == false ?
                                <div className='text-center'>
                                    <span
                                        onClick={() => setCategory({ ...getCategory, showMore: true })}
                                        className='d-inline-block mx-auto btn btn-secondary px-4'>Daha Çox
                                    </span>
                                </div>
                                : null
                        }
                    </div>
                    {
                        getLoader == true ?
                            <ProductGenLoader count={6} />
                            :
                            <>
                                <div className='row'>
                                    {
                                        getProduct.products && getProduct.products.length > 0 ?
                                            getProduct.products.map((product, i) => {
                                                return <ProductStandartComponent key={i} grid={3} product={product} />
                                            })
                                            :
                                            <div className="notFound text-center text-muted mt-3">
                                                <i className="fa-regular fa-basket-shopping-simple fa-3x text-muted"></i>
                                                <h2 className='title'>Məhsul Tapılmadı</h2>
                                            </div>
                                    }
                                </div>
                                {
                                    getProduct.maxPage > 1 ?
                                        <div className="paginateSide">
                                            {
                                                [...Array(getProduct.maxPage)].map((elementInArray, index) =>
                                                    <span
                                                        key={index}
                                                        className={`${getProduct.currentPage === index + 1 ? 'active' : ''}`}
                                                        onClick={() => setProduct((prev) => ({ ...prev, currentPage: index + 1 }))}>
                                                        {index + 1}
                                                    </span>
                                                )
                                            }
                                        </div>
                                        : null

                                }

                            </>
                    }
                </div>
            </div>
        </div>
    )
}