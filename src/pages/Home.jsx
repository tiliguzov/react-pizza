import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { sortProperties } from '../constants';

import { useSelector } from 'react-redux';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);

  const { searchValue } = React.useContext(SearchContext);

  const { selectedCategory, selectedSort } = useSelector((state) => state.filter);

  React.useEffect(() => {
    const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items');

    url.searchParams.append('page', selectedPage);
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
      setPageCount(responce.data.meta.total_pages);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [selectedCategory, selectedSort, searchValue, selectedPage]);

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
      <Pagination pageCount={pageCount} onChangePage={(selected) => setSelectedPage(selected)} />
    </div>
  );
};

export default Home;
