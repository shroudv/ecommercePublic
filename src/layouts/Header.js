import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { MuiDrawerContext } from '../components/Basket/MuiBasketDrawer';
import SearchBarComponent from '../components/SearchBar/SearchBarComponent';
import { BasketContext } from '../contexts/Basket/BasketContextProvider';
import { useSnackbar } from 'notistack';
import { CategoryContext } from '../contexts/Basket/CategoryContextProvider';

export default function Header() {

  const { setOpen } = useContext(MuiDrawerContext);
  const { getBasket } = useContext(BasketContext);
  const [getCategories, setCategories] = useState({ categories: [] })
  const { categories } = useContext(CategoryContext);
  const [getSubMenu, setSubMenu] = useState();
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCategories({ categories })
  }, [categories])

  const hoverHandler = (id) => getSubMenu === false ? setTimeout(() => setSubMenu(id), 300) : setSubMenu(id)

  return (
    <>
      <header className="header">
        <div className="topbar">
          <div className="content container">
            <div className="contacts">
              <Link to="tel:+994557700580"><i className="fa-solid fa-phone"></i> +994557700580</Link>
              <Link to="mailto:spport@ulc.az"><i className="fa-solid fa-phone"></i> spport@ulc.az</Link>
            </div>
            <div className="actions">
              <Link to="/"><i className="fa-solid fa-location-arrow"></i> Store Locations</Link>
              <Link to="/"><i className="fa-regular fa-truck"></i> Track Your Order</Link>
            </div>
          </div>
        </div>
        <div className="navbar container">
          <div className="brand">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <SearchBarComponent />
          <div className="toolbars">
            <Link to="/"><i className="fa-solid fa-fire"></i></Link>
            <Link to="/" onClick={(e) => e.preventDefault(setOpen(true))}>
              <i className="fa-solid fa-basket-shopping"></i>
              <div className="basket-badget">
                <span className=''> {getBasket.products ? getBasket.products.length : 0}</span>
              </div>
            </Link>
            <Link className="loginBtn" to={'/auth'}><i className="fa-regular fa-user"></i> Hesabım</Link>
          </div>
          <ul className="nav-links">
            {
              getCategories.categories.map((category, i) => {
                return (
                  <li key={i + 1} className="nav-link"
                    onMouseLeave={() => category.children && category.children.length > 0 ? hoverHandler(false) : null}
                    onMouseEnter={() => category.children && category.children.length > 0 ? hoverHandler(i + 1, true) : null}>
                    <Link to={`/catalog/${category.slug}`}>{category.title}</Link>
                    {
                      category.children && category.children.length > 0 ?
                        <div onMouseLeave={() => hoverHandler(false)} className={`sub-menu${i + 1 == getSubMenu ? ' active' : ''}`}>
                          <div className="wrapperMenu p-4">
                            {
                              category.children.map((subcat, i) => {
                                return (
                                  subcat.children && subcat.children.length > 0 ?
                                    <div key={i} className="smenu-column">
                                      <Link to={`/catalog/${category.slug}/${subcat.slug}`} className='smenuTitle'>{subcat.title}</Link>
                                      <ul className="subnav-links">
                                        {
                                          subcat.children.map((third, i) => {
                                            return <li key={i} className="nav-link">
                                              <Link to={`/catalog/${category.slug}/${subcat.slug}?third=${third.slug}`}>{third.title}</Link>
                                            </li>
                                          })
                                        }
                                      </ul>
                                    </div>
                                    : null
                                )
                              })
                            }
                          </div>
                        </div>
                        : null
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </header>
      <div className={`subMenuOverlay${getSubMenu > 0 ? ' active' : ''}`}></div>
    </>
  )
}