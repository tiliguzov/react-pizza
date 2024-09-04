import React from 'react';

import { categories } from '../constants';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setFilters } from '../redux/slices/filterSlice';

function Categories() {
  const { selectedCategory, selectedSort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onClickCategory = (index) => {
    dispatch(
      setFilters({
        selectedPage: 0,
        selectedCategory: index,
        selectedSort,
        pageCount,
      }),
    );
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={selectedCategory === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
