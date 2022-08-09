import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteElement } from '../../store/productsSlice'

function DeletePage() {
  const products = useSelector(state => state.products.products);
  const [choose, setChoose] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (products[0] !== undefined) {
      setChoose(products[0].id);
    }
  }, [products])

  function deleteProduct() {
    dispatch(deleteElement({ id: Number(choose) }));
  }
  return (
    <div className='choose'>
      <h1 className='page-title'>Удаление товаров</h1>
      {
        products[0] !== undefined
          ?
          <div className='choose-box'>
            <h2>Выберите товар</h2>
            <div className='select-box'>
              <select value={choose} onChange={(e) => { setChoose(e.target.value) }}>
                {products.map((item) => {
                  return <option value={item.id} key={item.id}>{item.title}</option>
                })}
              </select>
              <button onClick={deleteProduct}>Удалить выбранный товар</button>
            </div>
          </div>
          :
          <div className='choose-error'>
            <h2>Нет товаров для удаления</h2>
          </div>
      }
    </div>
  )
}

export default DeletePage