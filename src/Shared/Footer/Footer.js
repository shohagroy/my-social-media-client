import React from "react";
import logo from "../../Assets/logo1.png";

const Footer = () => {
  return (
    <footer>
      <hr />
      <footer className="px-4 divide-y bg-white text-gray-900">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <img className="w-2/1" src={logo} alt="" />
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-50">Product</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Integrations
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-50">Company</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Privacy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase text-gray-50">Developers</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Public API
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Documentation
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-gray-800">Developer </div>
              <div className="flex text-2xl justify-start space-x-3">
                <a
                  target="_"
                  href="http://github.com/shohagroy"
                  title="GitHub"
                  className="flex items-center p-1"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  target="_"
                  href="https://www.linkedin.com/in/shohag-roy-850a82236/"
                  title="LinkeDin"
                  className="flex items-center p-1"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/shohagroy.7771/"
                  title="Facebook"
                  className="flex items-center p-1"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center text-gray-400">
          © 2023 WeShare Co. All rights reserved.
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
