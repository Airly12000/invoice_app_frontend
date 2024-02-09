import React, { useState } from "react";
import Img from "../assets/images/image-avatar.jpg";
import Sun from "../assets/images/icon-sun.svg";
import Moon from "../assets/images/icon-moon.svg";

function SideBar() {
  const storedTheme = localStorage.getItem("theme");

  const handleThemeChange = () => {
    if (activeTheme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      setActiveTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
      setActiveTheme("light");
    }
  };

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [activeTheme, setActiveTheme] = useState(getPreferredTheme());

  const setTheme = (theme: string) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.setAttribute("theme", "dark");
    } else {
      document.body.setAttribute("theme", activeTheme);
    }
  };

  setTheme(getPreferredTheme());
  return (
    <nav className="d-flex sticky-top" id="sidebar">
      <div className="d-flex flex-lg-column flex-row align-items-center align-items-lg-start px-3 pt-2 text-white position-relative w-100">
        <div className="position-absolute start-0 top-0 d-flex flex-grow-1 justify-content-start mb-md-0 me-auto me-lg-0 w-100">
          <a
            href="/"
            className="d-flex flex-column align-items-center justify-content-center text-white text-decoration-none position-relative"
            id="logo"
          >
            <div className="col c1 w-100"></div>
            <div className="col c2 w-100"></div>
            <div className="fs-5 position-absolute col-white">
              <svg
                width="40"
                height="40"
                viewBox="0 0 65 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9714 0.000188009L32.5 31.0574L48.0286 0.00018819C58.1393 5.50976 65 16.2324 65 28.5574C65 46.5066 50.4493 61.0574 32.5 61.0574C14.5507 61.0574 0 46.5066 0 28.5574C0 16.2324 6.86068 5.50976 16.9714 0.000188009Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </a>
        </div>
        <div className="py-lg-4 mt-lg-auto ms-auto ms-lg-0 flex-shrink-1">
          <div className="d-flex flex-lg-column justify-content-evenly">
            <button
              type="button"
              className="btn bg-transparent col ms-1 justify-content-center align-items-center d-flex pb-2 border border-0"
              id="sun-moon"
              onClick={handleThemeChange}
            >
              <img
                src={activeTheme === "light" ? Moon : Sun}
                alt="sun-moon"
                width="20"
                height="20"
                className="rounded-circle"
              />
            </button>
            <div className="col border border-lg-0 ms-lg-1 my-0 my-lg-3 mx-3 mx-lg-0"></div>
            <div className="col ms-2">
              <img
                src={Img}
                alt="hugenerd"
                width="40"
                height="40"
                className="rounded-circle"
                id="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
