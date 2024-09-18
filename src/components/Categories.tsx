import React from 'react';

import { categories } from '../constants';

import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { selectFilter } from '../pages/Home';

const Categories: React.FC = () => {
  const { selectedCategory, selectedSort, pageCount } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onClickCategory = (index: number) => {
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
};

export default Categories;
