import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <Link to={'/'}
                          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        {/*logo*/}
                        <span className="ml-3 text-xl">Ecommerce</span>
                    </Link>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©
                        2022 Tailblocks —
                        <a href="#" className="text-gray-600 ml-1" rel="noopener noreferrer"
                           target="_blank">@knyttneve</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                      <a href='#' className="text-gray-500">
                        <i className="fa fa-facebook-square fa-2x text-white" aria-hidden="true"></i>
                      </a>
                      <a href='#' className="ml-3 text-gray-500">
                       <i className="fa fa-twitter-square fa-2x text-white" aria-hidden="true"></i>
                      </a>
                      <a href='#' className="ml-3 text-gray-500">
                        <i className="fa fa-instagram fa-2x text-white" aria-hidden="true"></i>
                      </a>
                      <a href='#' className="ml-3 text-gray-500">
                        <i className="fa fa-linkedin-square fa-2x text-white" aria-hidden="true"></i>
                      </a>
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer