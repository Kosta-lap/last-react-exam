import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
  const products = useSelector(state => state.products.products);
  let maxQuant = products.reduce((acc, item, i) => products[acc].quantity > item.quantity ? acc : i, 0);
  let minQuant = products.reduce((acc, item, i) => products[acc].quantity < item.quantity ? acc : i, 0);
  let maxSell = products.reduce((acc, item, i) => products[acc].sellingPrice > item.sellingPrice ? acc : i, 0);
  let minSell = products.reduce((acc, item, i) => products[acc].sellingPrice < item.sellingPrice ? acc : i, 0);

  return (
    <div className='statistic'>
      <h1 className='page-title'>Статистика по складу</h1>
      {
        products[0] !== undefined
          ?
          <div className='statistic-box'>
            <div className='statistic-item'>
              <p>Общее кол-во товаров на складе</p>
              <h3>{products.reduce((sum, item) => { return sum += item.quantity }, 0)}</h3>
            </div>
            <div className='statistic-item'>
              <p>Наибольшее кол-во товара на складе имеет</p>
              <h3>{products[maxQuant].title}</h3>
            </div>
            <div className='statistic-item'>
              <p>Наименьшее кол-во товара на складе имеет</p>
              <h3>{products[minQuant].title}</h3>
            </div>
            <div className='statistic-item'>
              <p>Самый дорогой товар на складе</p>
              <h3>{products[maxSell].title}</h3>
            </div>
            <div className='statistic-item'>
              <p>Самый дешевый товар на складе</p>
              <h3>{products[minSell].title}</h3>
            </div>
          </div>
          :
          <div className='choose-error'>
            <h2>Нет статистики для отображения</h2>
          </div>
      }
    </div>
  )
}

export default Home