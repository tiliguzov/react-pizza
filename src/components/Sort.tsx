import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setSort, setOrder } from '../redux/filter/slice';
import { Order, SortNames } from '../redux/filter/types';
import { findSortEnumValue } from '../utils/findEnumValue';

type SortProps = {
  value: SortNames;
  order: Order;
};

export const Sort: React.FC<SortProps> = React.memo(({ value, order }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedSort = value;
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSorts = (index: string) => {
    const sortEnumValue = findSortEnumValue(index);
    if (sortEnumValue) {
      dispatch(setSort(sortEnumValue));
    }
    setOpen(false);
  };

  const onClickOrder = () => {
    dispatch(setOrder(order === Order.DESC ? Order.ASC : Order.DESC));
    console.log('order clicked');
  };

  React.useEffect(() => {
    const handleClickEventListener = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickEventListener);

    return () => document.body.removeEventListener('click', handleClickEventListener);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          onClick={() => onClickOrder()}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: 'pointer', transformOrigin: '5px 3px' }}
          transform={order === Order.DESC ? 'rotate(180)' : ''}>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by: </b>
        <span onClick={() => setOpen(!open)}>{selectedSort}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {Object.values(SortNames).map((value, index) => (
              <li
                key={index}
                onClick={() => onClickSorts(value)}
                className={value === selectedSort.toString() ? 'active' : ''}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
