import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Watch Wagon 2023</p>
      </div>
    </div>
  );
};

export default Footer;
