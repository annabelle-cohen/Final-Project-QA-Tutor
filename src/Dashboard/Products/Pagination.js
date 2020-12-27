import React from "react";
import { Button } from "primereact/button";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        background: "none",
        textAlign: "center",
        border: "none",
        boxShadow: "none",
      }}
    >
      <ul
        className="pagination"
        style={{
          background: "none",
          textAlign: "center",
          border: "none",
          boxShadow: "none",
        }}
      >
        {pageNumbers.map((number) => (
          <Button
            Button
            label={number}
            className="p-button-text"
            onClick={() => paginate(number)}
            style={{ color: "black", position: "static", zIndex: "2" }}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
