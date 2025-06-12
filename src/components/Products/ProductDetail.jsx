import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productData from "../../data/productData.json"; // Sample JSON data
import CartIcon from "../Icons/CartIcon";
import HeartIcon from "../Icons/HeartIcon";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams(); // Extract ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleDecreseQuantity = () => {
    if (quantityInCart > 1) {
      updateQuantity(product.id, quantityInCart - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantityInCart === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };

  useEffect(() => {
    // Simulate API fetch (replace with real fetch if needed)
    const fetchProduct = () => {
      const foundProduct = productData.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found!</div>;

  const itemInCart = cartItems.find((item) => item.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Product Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full dark:hidden"
              src={product.images.light}
              alt={product.name}
            />
            <img
              className="w-full hidden dark:block"
              src={product.images.dark}
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.name}
            </h1>
            {/* Price, Rating, Buttons, etc. (same as before) */}
            {/* ... */}
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                ${product.price.toFixed(2)}
              </p>
              {/* <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
              /> */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {product.rating}
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ({product.reviewsCount})
                </p>
              </div>
            </div>

            {/* Buttons */}
            {quantityInCart === 0 ? (
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                {/* Add to favorites button */}
                {/* <button className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <HeartIcon /> Add to favorites
              </button> */}
                <button
                  className="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 flex items-center justify-center"
                  onClick={() => addToCart(product)}
                >
                  <CartIcon /> Add to cart
                </button>
              </div>
            ) : (
              <div className="flex items-center mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <button
                  type="button"
                  // onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  onClick={() => handleDecreseQuantity()}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id={`counter-input-${product.id}`}
                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                  value={quantityInCart}
                  readOnly
                />
                <button
                  type="button"
                  // onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  onClick={() => handleIncreaseQuantity()}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            )}

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Description & Features */}
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>
            <ul className="text-gray-500 dark:text-gray-400 list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
