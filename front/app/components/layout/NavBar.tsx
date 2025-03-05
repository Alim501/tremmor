import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "~/store";

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuth);

  return (
    <nav className=" border-gray-200 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/todo" className="flex items-center space-x-3 no-underline">
          <span className="self-center text-2xl font-semibold dark:text-white mx-4">
            Tremmor
          </span>
        </a>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex items-center space-x-8 font-medium">
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                Create
                <svg
                  className="w-3 h-3 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Выпадающее меню */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-44 bg-white shadow-lg rounded-lg z-20 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                    <li>
                      <Link
                        to="/todo/create"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Task
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/todo/create/category"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/todo/create/priority"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Priority
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {isAuthenticated && (
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white px-4 py-2"
                >
                  Sign out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
