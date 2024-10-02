import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PizzaItem } from '../redux/pizzas/types';
import { categories, typeName } from '../constants';
import { CartItem } from '../redux/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cart/slice';
import { selectCartItemById } from '../redux/cart/selectors';

const FullPizza: React.FC = () => {
  const [pizzaData, setPizzaData] = React.useState<PizzaItem>();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const cartItem = useSelector(selectCartItemById(pizzaData?.id ?? 0));
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchItemData = async (id: string) => {
      const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items/' + id);

      try {
        const { data } = await axios.get(url.toString());
        setPizzaData(data);
      } catch {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    };

    if (id) {
      fetchItemData(id);
    }
  }, []);

  const onClickAddPizza = () => {
    if (!pizzaData) return;

    const item: CartItem = {
      id: pizzaData.id,
      title: pizzaData.title,
      price: pizzaData.price,
      imageUrl: pizzaData.imageUrl,
      type: typeName[activeType],
      size: pizzaData.sizes[activeSize],
      count: 0,
    };

    dispatch(addItem(item));
  };

  if (!pizzaData) {
    return <>Loading...</>;
  }

  return (
    <div className="full_container">
      <img src={pizzaData.imageUrl} alt="Pizza image" />
      <div className="pizza-details">
        <h2>{pizzaData.title}</h2>
        <p>{pizzaData.description}</p>
        <div className="pizza-block__selector">
          <ul>
            {pizzaData.types.map((type: number, index: number) => (
              <li
                key={type}
                onClick={() => setActiveType(index)}
                className={activeType === index ? 'active' : ''}>
                {typeName[type]}
              </li>
            ))}
          </ul>
          <ul>
            {pizzaData.sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="rating">
          Rating: <span>{pizzaData.rating}</span>
        </div>
        <div className="category">
          Category: <span>{categories[pizzaData.category]}</span>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {pizzaData.price} ₽</div>
          <button onClick={onClickAddPizza} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add to cart</span>
            {cartItem && cartItem.count > 0 && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
