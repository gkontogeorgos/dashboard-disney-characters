import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <svg
          className="disney-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M275.5 96.5c-7.4-4.6-16.1-7.2-25.5-7.2-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48c0-9.4-2.7-18.1-7.2-25.5L416 16 16 416l95.2-95.2c7.4 4.6 16.1 7.2 25.5 7.2 26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48c0 9.4 2.7 18.1 7.2 25.5L16 416 416 16l-140.5 80.5z" />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
