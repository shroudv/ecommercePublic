import React, { Component } from 'react'
import logo from '../assets/img/logo.png';


export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="footerUp">
            <div className="column col-12 col-xl-3">
              <div className="footer-brand">
                <img src={logo} alt="" />
              </div>
              <div className="footerContent">
                <p>
                  since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book.
                </p>
                <div className="footerMedia">
                  <a href="/"><i className="fa-brands fa-instagram"></i></a>
                  <a href="/"><i className="fa-brands fa-twitter"></i></a>
                  <a href="/"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                </div>
              </div>
            </div>
            <div className="column col-12 col-xl-3">
              <div className="title">
                <h4>Bizimlə Əlaqə</h4>
              </div>
              <div className="footerContent">
                <p>
                  <span>Address: </span>
                  Patricia C.Amedee 4401 Waldeck Street Grapevine Nashville, Tx 76051
                </p>
                <p>
                  <span>Phone: </span>
                  +99(0)101 0000 888
                </p>
                <p>
                  <span>Email: </span>
                  info@yourdomain.com
                </p>
              </div>
            </div>
            <div className="column col-12 col-xl-3">
              <div className="title">
                <h4>Səhifələr</h4>
              </div>
              <div className="footerContent">
                <ul className='nav-links'>
                  <li>
                    <a href="/">Ana Səhifə</a>
                  </li>
                  <li>
                    <a href="/">Services</a>
                  </li>
                  <li>
                    <a href="/">Services</a>
                  </li>
                  <li>
                    <a href="/">Services</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column col-12 col-xl-3">
              <div className="titel">
                <h4>Məlumat Mərkəzi</h4>
              </div>
              <div className="footerContent">
                <ul className='nav-links'>
                  <li>
                    <a href="/">Məxfilik Siyasəti</a>
                  </li>
                  <li>
                    <a href="/">İstifadəçi Razılaşması</a>
                  </li>
                </ul>
                <img className='' src="https://logodix.com/logo/335623.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="footerDown">
            <div className="downLeft">
              <p>Terms of use | Privacy Environmental Policy</p>
            </div>
            <div className="downRight">
              <p>© 2022 Privacy Environmental Policy</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
