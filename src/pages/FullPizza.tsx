import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizzaData, setPizzaData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

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

  if (!pizzaData) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <h1>{id}</h1>
      <img src={pizzaData.imageUrl} alt="Pizza image" />
    </div>
  );
};

export default FullPizza;
