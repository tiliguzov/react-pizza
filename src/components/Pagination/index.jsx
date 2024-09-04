import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPage } from '../../redux/slices/filterSlice';

function Pagination() {
  const dispatch = useDispatch();

  const { pageCount, selectedPage } = useSelector((state) => state.filter);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        console.log(event.selected);
        dispatch(setSelectedPage(event.selected));
      }}
      forcePage={selectedPage}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
