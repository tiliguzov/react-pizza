import React from 'react';

import { categories } from '../constants';

import { useDispatch } from 'react-redux';
import { setCategory, setSelectedPage } from '../redux/filter/slice';

type CategoriesProps = {
  selectedCategory: number;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ selectedCategory }) => {
  const dispatch = useDispatch();

  const onClickCategory = React.useCallback(
    (index: number) => () => {
      dispatch(setSelectedPage(0));
      dispatch(setCategory(index));
    },
    [],
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={onClickCategory(index)}
            className={selectedCategory === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});
