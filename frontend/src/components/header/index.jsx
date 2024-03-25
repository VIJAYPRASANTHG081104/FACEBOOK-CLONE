import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../svg/logo.jsx";
import Search from "../../svg/search.jsx";
import HomeActive from "../../svg/homeActive.jsx";
import Friends from "../../svg/friends.jsx";
import Market from "../../svg/market.jsx";
import Gaming from "../../svg/gaming.jsx";
import Watch from '../../svg/watch.jsx'
const Header = () => {
  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color}/>
          <div className="middle_notification">
            8+
          </div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color}/>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color}/>
        </Link>
      </div>
      <div className="header_right"></div>
    </header>
  );
};

export default Header;
