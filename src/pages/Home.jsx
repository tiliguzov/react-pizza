import React from 'react';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { sortProperties } from '../constants';
import { setFilters } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, pizzas } = useSelector((state) => state.pizzas);

  const { searchValue } = React.useContext(SearchContext);

  const [isMounted, setIsMounted] = React.useState(false);

  const { selectedCategory, selectedSort, selectedPage, pageCount } = useSelector(
    (state) => state.filter,
  );

  const getData = async () => {
    dispatch(
      fetchPizzas({
        selectedPage,
        selectedCategory,
        selectedSort: sortProperties[selectedSort],
        searchValue,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      dispatch(setFilters({ ...qs.parse(window.location.search.substring(1)), pageCount }));
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      getData();
    }
  }, [selectedCategory, selectedSort, selectedPage, searchValue, isMounted]);

  React.useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({ selectedSort, selectedCategory, selectedPage });
      navigate(`?${queryString}`);
    }
    setIsMounted(true);
  }, [selectedCategory, selectedSort, selectedPage, searchValue]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'rejected' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить питсы :( Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : items}</div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
