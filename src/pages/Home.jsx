import React from 'react';
import axios from 'axios';
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

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMounted, setIsMounted] = React.useState(false);

  const { searchValue } = React.useContext(SearchContext);

  const { selectedCategory, selectedSort, selectedPage, pageCount } = useSelector(
    (state) => state.filter,
  );

  const fetchData = () => {
    const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items');

    url.searchParams.append('page', selectedPage + 1);
    url.searchParams.append('limit', '4');
    if (selectedCategory > 0) {
      url.searchParams.append('category', selectedCategory);
    }
    url.searchParams.append('sortBy', sortProperties[selectedSort]);
    if (searchValue) {
      url.searchParams.append('title', `*${searchValue}`);
    }
    setIsLoading(true);

    axios.get(url).then((responce) => {
      console.log(responce.data);
      setPizzas(responce.data.items);
      const totalPages = responce.data.meta.total_pages;
      const currentPage = responce.data.meta.current_page - 1;
      dispatch(
        setFilters({
          selectedPage: currentPage,
          pageCount: totalPages,
          selectedSort,
          selectedCategory,
        }),
      );
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    console.log('useEffect search url');
    if (window.location.search && !isMounted) {
      dispatch(setFilters({ ...qs.parse(window.location.search.substring(1)), pageCount }));
    }
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      fetchData();
      const queryString = qs.stringify({ selectedSort, selectedCategory, selectedPage });
      navigate(`?${queryString}`);
    }
  }, [selectedCategory, selectedSort, selectedPage, isMounted, searchValue]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : items}</div>
      <Pagination />
    </div>
  );
};

export default Home;
