import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="logo">
        <div className="company-name">
       EDR Showdailies
       </div>
        <div className="edr-button">
          <span className="do-not-display-on-mobile"> More content on </span>EDR Online
        </div>
      </div>
      <div className="nav">
        <Link to="/">
          <div className="icon-btn">
            <span className="material-symbols-outlined">
              home
            </span>
            <span className="icon-title">Home</span>
          </div>
        </Link>
        <Link to="news">
          <div className="icon-btn">
            <span className="material-symbols-outlined">library_books</span>
            <span className="icon-title">News</span>
          </div>
        </Link>
        <Link to="videos">
          <div className="icon-btn">
            <span className="material-symbols-outlined">movie</span>
            <span className="icon-title">Videos</span>
          </div>
        </Link>
        <Link to="magazine">
          <div className="icon-btn">
            <span className="material-symbols-outlined">newspaper</span>
            <span className="icon-title">Magazine</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header;