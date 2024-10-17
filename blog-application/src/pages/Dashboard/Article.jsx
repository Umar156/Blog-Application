import React, { useState, useEffect } from "react";
import "../../layouts/Dashboard/style.css";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";
import ReactPaginate from "react-paginate";
import CustomTable from "../../components/CustomTable";
import { ARTICLES_TABLE_COLUMNS } from "../../constants";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBlogs = () => {
    apiHandler(`${endpoint.CREATE_BLOGS}?page=${currentPage + 1}`, "GET")
      .then((res) => {
        setArticles(res.data.articles);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <CustomTable
        title="List of Articles"
        columns={ARTICLES_TABLE_COLUMNS}
        data={articles}
      />
      <div>
        <ReactPaginate
          containerClassName={"pagination justify-content-center"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
