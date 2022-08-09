import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addElement } from '../../store/productsSlice'

function AddPage() {
  const [isFull, setIsFull] = useState(false);
  const [isBalance, setIsBalance] = useState(false);

  const inputTitle = useRef();
  const inputPurchase = useRef();
  const inputSell = useRef();
  const inputQtn = useRef();

  const dispatch = useDispatch();
  const balance = useSelector(state => state.products.balance);

  function addProduct() {
    dispatch(addElement({
      object: {
        id: 0,
        title: inputTitle.current.value.trim(),
        purchasePrice: Number(inputPurchase.current.value),
        sellingPrice: Number(inputSell.current.value),
        quantity: Number(inputQtn.current.value)
      }
    }));

    inputTitle.current.value = '';
    inputPurchase.current.value = '';
    inputSell.current.value = '';
    inputQtn.current.value = '';
  }
  function Valid() {
    let isReady = true;

    if (inputTitle.current.value === '' || inputPurchase.current.value === '' || inputSell.current.value === '' || inputQtn.current.value === '') {
      isReady = false;
      setIsFull(true);
    } else {
      setIsFull(false)
    }

    if ((Number(inputPurchase.current.value) * Number(inputQtn.current.value)) > balance) {
      isReady = false;
      setIsBalance(true);
    } else {
      setIsBalance(false)
    }

    return isReady
  }

  return (
    <div className='add'>
      <h1 className='page-title'>Добавление товаров</h1>
      <div className='add-form'>
        <div className='form-box'>
          <label htmlFor="title">Название</label>
          <input type="text" id='title' ref={inputTitle} />
        </div>
        <div className='form-box'>
          <label htmlFor="purchase">Закупочная цена</label>
          <input type="number" id='purchase' ref={inputPurchase} />
        </div>
        <div className='form-box'>
          <label htmlFor="sell">Цена продажи</label>
          <input type="number" id="sell" ref={inputSell} />
        </div>
        <div className='form-box form-area'>
          <label htmlFor="qtn">Количество</label>
          <input type="number" id="qtn" ref={inputQtn} />
        </div>
        <button onClick={() => { if (Valid()) { addProduct() } }}>Добавить</button>
      </div>
      <div className='add-warnings'>
        <p style={{ display: isBalance ? 'inline' : 'none' }}>Недостаточно средств на балансе!</p>
        <p style={{ display: isFull ? 'inline' : 'none' }}>Не все поля заполненны!</p>
      </div>
    </div>
  )
}

export default AddPage