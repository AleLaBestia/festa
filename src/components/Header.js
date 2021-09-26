import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signIn, signOut } from "../slices/userSlice";
import { auth } from "../Firebase";
import Sidebar from "./Sidebar";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const basket = useSelector(selectItems);

  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch(
          signIn({
            uid: auth.uid,
            email: auth.email,
            displayName: auth.displayName,
          })
        );
      } else {
        dispatch(signOut());
      }
    });
  }, []);

  const changeTheme = () => {
    let htmlClasses = document.querySelector("html").classList;
    if (localStorage.theme == "dark") {
      htmlClasses.remove("dark");
      localStorage.removeItem("theme");
    } else {
      htmlClasses.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <>
      <header id="header">
        {/* Top Navigation */}
        <div className="flex items-center flex-grow p-1 py-2 bg-amazon_blue">
          <div
            className="flex items-center flex-grow mt-2 sm:flex-grow-0"
            onClick={() => router.push("/")}
          >
            <Image
              src="https://links.papareact.com/f90"
              width={150}
              height={40}
              objectFit="contain"
              className="w-24 cursor-pointer"
            />
          </div>
          <div className="flex items-center hidden mx-1 space-x-1 text-xs text-white sm:flex whitespace-nowrap">
            <p className="font-extrabold md:text-sm">
              Deliver to <span className="link">Lanus</span>
            </p>
            <LocationMarkerIcon className="h-6 text-white" />
          </div>
          {/* Search Bar */}
          <div className="items-center flex-grow hidden h-10 bg-yellow-400 rounded-md cursor-pointer sm:flex dark:bg-red-600 hover:bg-yellow-500 whitespace-nowrap">
            <input
              className="flex-grow flex-shrink w-6 h-full p-2 px-4 rounded-l-md focus:outline-none"
              type="text"
            />
            <SearchIcon className="h-12 p-4" />
          </div>

          {/* Right */}
          <div className="flex items-center mx-6 space-x-6 text-xs text-white">
            <div className="relative flex space-x-0 hiiden link">
              <p className="hidden mt-2 font-extrabold md:text-sm md:inline ">
                eng
              </p>
              <ChevronDownIcon className="hidden h-6 mt-2 mr-1 md:inline" />
            </div>
            <div
              className="link"
              onClick={() =>
                user.user ? auth.signOut() : router.push("/login")
              }
            >
              <p>Hello {user.user?.displayName},</p>
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>
            <div className="link" onClick={() => router.push("/orders")}>
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div
              className="relative flex items-center link"
              onClick={() => router.push("/basket")}
            >
              <span className="absolute top-0 right-0 w-4 h-4 font-bold text-center bg-yellow-400 rounded-full md:right-1/2">
                {basket.length}
              </span>

              <ShoppingCartIcon className="h-10" />
              <p className="hidden font-extrabold md:inline md:text-sm">
                Basket
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center p-2 space-x-5 text-sm text-center text-white bg-amazon_blue-light">
          <p
            className="flex items-center link"
            onClick={() => (sidebar ? setSidebar(false) : setSidebar(true))}
          >
            <MenuIcon className="h-6 mr-1" />
            All
          </p>
          <p className="link">Prime Video</p>
          <p className="link">Amazon Business</p>
          <p className="link">Today's Deals</p>
          <p className="hidden link lg:inline-flex">Electronics</p>
          <p className="hidden link lg:inline-flex">Food & Grocery</p>
          <p className="hidden link lg:inline-flex">Prime</p>
          <p className="hidden link lg:inline-flex">Buy Again</p>
          <p className="hidden link lg:inline-flex">Shopper Toolkit</p>
          <p className="hidden link lg:inline-flex">Health & Personal Care</p>
        </div>
      </header>

      {sidebar ? <Sidebar /> : null}
    </>
  );
}

export default Header;
