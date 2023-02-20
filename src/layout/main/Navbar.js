import { createSelector } from "@reduxjs/toolkit";
import { signOut, } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../firebase/firebase.config";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth)
  const { email, role } = user;
  const dispatch = useDispatch()


  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logout())
    }).catch(err => console.error(err))
  }

  console.log(user)
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto mr-2 font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>

        {
          email ? (
            <button onClick={handleSignOut} className=" btn-sm hover:text-primary">Logout</button>
          ) : (<li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/login'
            >
              Login
            </Link>
          </li>)}

        {email && role &&
          <li>
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/dashboard'
            >
              Dashboard
            </Link>
          </li>
        }
        {email && !role &&
          < li >
            <Link
              className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
              to='/register'
            >
              Register
            </Link>
          </li>
        }
      </ul>
    </nav >
  );
};

export default Navbar;
