import React from 'react';

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-1">
                <div id="about" className="footer-header-1">ABOUT<br></br>About Us<br></br>Contact Us</div>
                <div id="help" className="footer-header-1">HELP<br></br>Payments<br></br>Shipping</div>
                <div id="social" className="footer-header-1">SOCIAL<br></br>Twitter<br></br>Facebook</div>
            </div>
            <div className="footer-2">
                <div id="mail" className="footer-header-2">MAIL US<br></br>gargayush308@gmail.com</div>
                <div id="office" className="footer-header-2">Registered Office Address<br></br>Ballabgarh, faridabad</div>
            </div>
        </div>
    );
}

export default Footer;