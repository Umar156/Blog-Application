import React, { useState, useEffect } from "react";
import "../../layouts/Dashboard/style.css";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";
import ReactPaginate from "react-paginate";
import CustomTable from "../../components/CustomTable";
import { USER_TABLE_COLUMNS } from "../../constants";

export default function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUser = () => {
    apiHandler(`${endpoint.CREATE_USERS}?page=${currentPage + 1}`, "GET")
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <CustomTable
        title="List of Users"
        columns={USER_TABLE_COLUMNS}
        data={users}
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
