import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import productData from '../../data/productData.json';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // If fetched from API, fetch here
    setProducts(productData);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
