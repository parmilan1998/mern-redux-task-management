import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-white font-poppins'>
      <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-24'>
        <div className='flex h-16 items-center justify-between'>
          <div className='md:flex md:items-center md:gap-12'>
            <Link className='block text-teal-600' to='/'>
              <span className='sr-only'>Home</span>
              <h1 className='text-2xl text-cyan-500 font-semibold'>
                Task<span className='text-sky-500'>Quest</span>
              </h1>
            </Link>
          </div>

          <div className='hidden md:block'>
            <nav aria-label='Global'>
              <ul className='flex items-center gap-6 text-md'>
                <li>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to='/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to='/tasks'
                  >
                    Tasks
                  </Link>
                </li>

                <li>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to='/projects'
                  >
                    Projects
                  </Link>
                </li>

                <li>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to='/services'
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to='/help'
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4'>
              <Link
                className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow'
                to='/login'
              >
                Login
              </Link>

              {/* <div className='hidden sm:flex'>
                <a
                  className='rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600'
                  href='#'
                >
                  Register
                </a>
              </div> */}
            </div>

            <div className='block md:hidden'>
              <button className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
