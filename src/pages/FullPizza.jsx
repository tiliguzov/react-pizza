import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizzaData, setPizzaData] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchItemData = async (id) => {
      const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items/' + id);

      try {
        const { data } = await axios.get(url);
        setPizzaData(data);
      } catch {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    };

    fetchItemData(id);
  }, []);

  if (!pizzaData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <h1>{id}</h1>
      <img src={pizzaData.imageUrl} alt="Pizza image" />
    </div>
  );
};

export default FullPizza;
