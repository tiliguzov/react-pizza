import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import './scss/app.scss';

import Home from './pages/Home';
//import FullPizza from './pages/FullPizza';
//import Cart from './pages/Cart';
//import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

//const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Cart Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Not Found Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Full Pizza Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
