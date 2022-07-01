import React, { useState } from 'react'

export default function Auth() {

  const [getForm, setForm] = useState({ email: '', password: '' });
  const [getError, setError] = useState({ errors: [] })

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = (e) => {
    setError({ errors: {} })
    //..... Post proccess
  }

  const validateForm = (e) => {
    e.preventDefault();
    const errors = {};

    Object.keys(getForm).map(field => {
      if (field == 'email' && getForm[field].length == 0) {
        errors[field] = 'bu hissə boş ola bilməz'
      }
      if (field == 'password' && getForm[field].length == 0) {
        errors[field] = 'bu hissə boş ola bilməz'
      }
    })

    Object.keys(errors).length > 0 ? setError({ errors }) : submitHandler(e)
  }

  return (
    <div className="container">
      <div className="loginSide">
        <div className="headSide">
          <i className="fa-regular fa-user"></i>
          <h4>İstifadəçi Girişi</h4>
        </div>
        <div className="bodySide">
          <form action="" onSubmit={(e) => validateForm(e)}>
            <div className="group">
              <label htmlFor="">Elektron Ünvan</label>
              {
                getError.errors.email ?
                  <div className="alert alert-danger" role="alert">{getError.errors.email}</div>
                  : null
              }
              <input type="text" name="email" id="" value={getForm.email} onChange={(e) => inputHandler(e)} />
            </div>
            <div className="group">
              <label htmlFor="">Şifrə</label>
              {
                getError.errors.password ?
                  <div className="alert alert-danger" role="alert">{getError.errors.password}</div>
                  : null
              }
              <input type="text" name="password" id="" value={getForm.password} onChange={(e) => inputHandler(e)} />
            </div>
            <div className="action">
              <button className='btn btn-outline-primary' type="submit">Göndər</button>
              <button className='btn btn-outline-secondary' type="button">Geri</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
