import React, { useContext, useState } from 'react'
import { AuthProviderContext } from '../../contexts/AuthProvider';
import { useDispatch,useSelector } from 'react-redux';
import AuthSlice, {signIn} from '../../features/Authorization/AuthSlice';

export default function Auth() {

  const AuthContextProvider = useContext(AuthProviderContext);
  const [getForm, setForm] = useState({ email: '', password: '' });
  const [getError, setError] = useState({ responseError: null, errors: [] })
  const dispatch=useDispatch();

  const AuthReducer=useSelector(state=>state);

 

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(getForm))
    console.log(AuthReducer)
    // setError({ errors: {} })
    // axios.post(`${process.env.REACT_APP_API_HOST}/auth`, {
    //   email: getForm.email,
    //   password: getForm.password
    // }, {
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(res => {
    //   const { data } = res.data;
    //   const cookies = new Cookies();
    //   cookies.set('token', data.token)
    // })
    //   .catch(err => setError({ errors: [], responseError: err.response.data.error }))
  }

  // const validateForm = (e) => {
  //   e.preventDefault();
  //   const errors = {};

  //   Object.keys(getForm).map(field => {
  //     if (field == 'email' && getForm[field].length == 0) {
  //       errors[field] = 'Bu hissə boş ola bilməz'
  //     }
  //     if (field == 'password' && getForm[field].length == 0) {
  //       errors[field] = 'Bu hissə boş ola bilməz'
  //     }
  //   })

  //   Object.keys(errors).length > 0 ? setError({ errors }) : submitHandler(e)
  // }

  return (
    <div className="container">
      <div className="loginSide">
        <div className="headSide">
          <i className="fa-regular fa-user"></i>
          <h4>İstifadəçi Girişi</h4>
        </div>
        <div className="bodySide">
          <form action="#" onSubmit={(e) => submitHandler(e)}>
            {
              getError.responseError ?
                <div className="alert alert-danger mt-4 text-center" role="alert">
                  {getError.responseError == 'Unauthorized' ? 'İstifadəçi adı və ya email yanlışdır' : null}
                </div>
                : null
            }

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
