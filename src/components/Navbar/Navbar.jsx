import React, { useRef, useState, useEffect, useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../Icons/SearchIcon";

const Navbar = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isMyCartDropdownOpened, setMyCartDropdownOpened] = useState(false);
  const [isUserDropdownOpened, setUserDropdownOpened] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Failed to log out. Please try again.");
    }
  };

  const menuRef = useRef();
  const myCartRef = useRef();
  const userRef = useRef();

  const { cartItems, removeFromCart } = useContext(CartContext);
  const limitedCartItems = cartItems.slice(0, 5);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const toggleMyCartDropdown = () => {
    setMyCartDropdownOpened((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myCartRef.current && !myCartRef.current.contains(event.target)) {
        setMyCartDropdownOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myCartRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userRef]);

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <a
                  href="/"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Home
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Best Sellers
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Gift Ideas
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Today's Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Search bar */}
          <form className="w-full max-w-2xl mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                placeholder-transparent sm:placeholder-gray-400"
                placeholder="Search Phones, Laptops..."
                required
              />
              {/* <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Search
              </button> */}
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
                 text-sm px-2 py-2 sm:px-4 sm:py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {/* "Search" text - visible only on 'sm' (small) screens and up */}
                <span className="hidden sm:inline">Search</span>
                {/* Search icon - visible only on screens smaller than 'sm' */}
                <SearchIcon className="w-4 h-4 text-white inline sm:hidden" />
              </button>
            </div>
          </form>

          <div className="flex items-center lg:space-x-2">
            <div className={"flex-col"}>
              <a href="/cart">
                <button
                  id="myCartDropdownButton1"
                  // onClick={toggleMyCartDropdown}
                  data-dropdown-toggle="myCartDropdown1"
                  type="button"
                  className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                >
                  <span className="sr-only">Cart</span>
                  <svg
                    className="w-5 h-5 lg:me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  <span className="hidden sm:flex">My Cart</span>
                  {/* <svg
                  className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg> */}
                </button>
              </a>

              <div
                id="myCartDropdown1"
                ref={myCartRef}
                className={`absolute z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800 ${
                  isMyCartDropdownOpened ? "block" : "hidden"
                }`}
              >
                {/* <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Apple iPhone 15
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $599
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem1a"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem1a"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Apple iPad Air
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $499
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem2a"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem2a"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Apple Watch SE
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $598
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 2
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem3b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem3b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Sony Playstation 5
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $799
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem4b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem4b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                    >
                      Apple iMac 20"
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $8,997
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 3
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem5b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem5b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div> */}
                {cartItems.length > 0 ? (
                  <>
                    {limitedCartItems.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-2 items-start"
                      >
                        <div>
                          <a
                            href={`/product/${item.id}`} // Link to product page
                            className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                          >
                            {/* {item.title} */}
                            <abbr title={item.title}>
                              {item.title.length > 20
                                ? item.title.substring(0, 20) + "..."
                                : item.title}
                            </abbr>
                          </a>
                          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                            $
                            {typeof item.price === "number"
                              ? item.price.toFixed(2)
                              : "0.00"}
                          </p>
                        </div>

                        <div className="flex items-start justify-end gap-6">
                          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            type="button"
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                          >
                            <span className="sr-only"> Remove </span>
                            <svg
                              className="h-4 w-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    {cartItems.length > 5 && (
                      <div className="p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          And {cartItems.length - 5} more item(s)
                        </p>
                      </div>
                    )}
                    <div className="p-4">
                      <a
                        href="/cart" // Link to your full cart page
                        className="w-full inline-flex items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        role="button"
                      >
                        Show All Items
                      </a>
                    </div>

                    <div className="p-4">
                      <a
                        href="/checkout" //  Link to your checkout page
                        className="w-full inline-flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        role="button"
                      >
                        Go to my checkout
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your cart is empty.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-col">
              <button
                id="userDropdownButton1"
                onClick={toggleUserDropdown}
                data-dropdown-toggle="userDropdown1"
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                <svg
                  className="w-5 h-5 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Account
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-white ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id="userDropdown1"
                ref={userRef}
                className={`absolute z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700 ${
                  isUserDropdownOpened ? "block" : "hidden"
                }`}
              >
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {" "}
                      My Account{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {" "}
                      My Orders{" "}
                    </a>
                  </li>
                </ul>

                <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                  <a
                    href="#"
                    title=""
                    className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    {" "}
                    Sign Out{" "}
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open Menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="ecommerce-navbar-menu-1"
          ref={menuRef}
          className={`absolute right-0 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4 ${
            isMenuOpened ? "block" : "hidden"
          }`}
        >
          <ul className="text-gray-900 dark:text-white text-sm font-medium space-y-3">
            <li>
              <a
                href="/"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Gift Ideas
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
