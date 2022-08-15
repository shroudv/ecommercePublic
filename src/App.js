import { Route, Routes } from 'react-router-dom';
import './assets/css/style.css';
import './assets/css/all.css';
import HomePage from './pages/Home/index';
import ProductSinglePage from './pages/Product/Single';
import Category from './pages/Category/Index';
import Master from './layouts/Master'
import ScrollComponent from './components/ScrollComponent';
import { SnackbarProvider } from 'notistack';
import Page404 from './pages/Error/Page404';
import Auth from './pages/Auth/Auth';

function App() {

  return (
    <SnackbarProvider maxSnack={3}>
      <Master>
        <ScrollComponent />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/catalog/:topcategory' element={<Category />} />
          <Route path='/catalog/:topcategory/:subcategory' element={<Category />} />
          <Route path='/catalog/:topcategory/:subcategory/:slug' element={<ProductSinglePage />} />
          <Route path='/404' element={<Page404/>} />
        </Routes>
      </Master>
    </SnackbarProvider>
  );
}

export default App;
