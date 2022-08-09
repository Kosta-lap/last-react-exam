import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeElement } from '../../store/productsSlice'

function SellPage() {
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const [choose, setChoose] = useState(undefined);
    const [isQtn, setIsQtn] = useState(false);

    const inputQtn = useRef();

    useEffect(() => {
        if (products[0] !== undefined) {
            setChoose(products[0].id);
        }
    }, [])

    function sellProduct() {
        dispatch(changeElement({
            object: {
                id: Number(choose),
                qtn: Number(inputQtn.current.value)
            }
        }));
        inputQtn.current.value = '';
    }

    function findProduct() {
        return products.find(item => item.id === Number(choose))
    }

    function Valid() {
        let isReady = true;

        if (Number(inputQtn.current.value) <= 0 || Number(inputQtn.current.value) > findProduct().quantity) {
            isReady = false;
            setIsQtn(true);
        } else {
            setIsQtn(false);
        }

        return isReady
    }

    return (
        <div className='choose'>
            <h1 className='page-title'>Продажа товаров</h1>
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
                            <div className='select-box-item'>
                                <p>Доступно товаров: {choose !== undefined ? findProduct().quantity : ""}</p>
                                <p>Цена продажи: {choose !== undefined ? findProduct().sellingPrice : ""}$</p>
                                <input type="number" id="qtn" placeholder='Кол-во товаров' ref={inputQtn} />
                            </div>
                            <button onClick={() => { if (Valid()) { sellProduct() } }}>Продать выбранный товар</button>
                        </div>
                    </div>
                    :
                    <div className='choose-error'>
                        <h2>Нет товаров для продажи</h2>
                    </div>
            }
            <div className='add-warnings'>
                <p style={{ display: isQtn ? 'inline' : 'none' }}>Ошибка в указании кол-ва!</p>
            </div>
        </div>
    )
}

export default SellPage