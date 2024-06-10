import React from "react";
import { useLocation } from "react-router-dom";
import "./css/Breadcrumb.css";

const Breadcrumb = ({ children }) => {
  const location = useLocation();

  const getPageName = (pathname) => {
    const path = pathname.split("/").filter((p) => p !== "");
    return path.length > 0 ? path[path.length - 1] : "Home";
  };

  return (
    <section id="BreadCrumb">
      <nav aria-label="breadcrumb" className="bg-image">
        <h1 style={{ paddingTop: 30, paddingLeft: 100, color: "#c8b47e" }}>
          {getPageName(location.pathname)}
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {getPageName(location.pathname)}
          </li>
        </ol>
      </nav>
      <div className="breadcrumb-children">{children}</div>
    </section>
  );
};

export default Breadcrumb;
