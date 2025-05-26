import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail";
import SignupPage from "./components/Auth/SignUpPage";
import LoginPage from "./components/Auth/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
