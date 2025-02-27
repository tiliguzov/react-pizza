import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPage } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  const { pageCount, selectedPage } = useSelector(selectFilter);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        dispatch(setSelectedPage(event.selected));
      }}
      forcePage={selectedPage}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
