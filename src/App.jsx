import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import ProductDetail from './components/Products/ProductDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
