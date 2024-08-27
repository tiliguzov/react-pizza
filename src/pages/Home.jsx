import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { sortProperties } from '../constants';

const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [selectedSort, setSelectedSort] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState('0');

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

  React.useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr.items);
        setPageCount(arr.meta.total_pages);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [selectedCategory, selectedSort, searchValue, selectedPage]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selected={selectedCategory}
          onClickCategory={(index) => setSelectedCategory(index)}
        />
        <Sort selected={selectedSort} onClickSort={(index) => setSelectedSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? sceletons : items}</div>
      <Pagination pageCount={pageCount} onChangePage={(selected) => setSelectedPage(selected)} />
    </div>
  );
};

export default Home;
