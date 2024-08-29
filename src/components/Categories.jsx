import React from 'react';

import { categories } from '../constants';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

function Categories() {
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategory({ index }))}
            className={selectedCategory === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
