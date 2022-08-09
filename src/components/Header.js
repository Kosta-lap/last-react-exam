import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

function Header() {
    const balance = useSelector(state => state.products.balance);

    return (
        <header className='cover'>
            <div className='container'>
                <div className='header-box body-page'>
                    <div className='header-links'>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/add-products">Добавить</NavLink>
                        <NavLink to="/delete-products">Удалить</NavLink>
                        <NavLink to="/sell-products">Продать</NavLink>
                        <NavLink to="/history-products">История</NavLink>
                    </div>
                    <div className='header-balance'>
                        <p>Баланс: {balance}$</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header