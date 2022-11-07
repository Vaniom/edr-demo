import React from "react";

const Footer = () => {
  return(
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a href="/" target="_blank">Contact us</a>
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com/EDRMagazine" target="_blank" rel="noreferrer noopener">
          <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/edrmagasine" target="_blank" rel="noreferrer noopener">
          <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/company/edr-magazine/" target="_blank" rel="noreferrer noopener">
          <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;