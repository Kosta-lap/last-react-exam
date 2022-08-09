import React from 'react'
import { useSelector } from 'react-redux';
import HistoryItem from '../HistoryItem'

function HistoryPage() {
    const history = useSelector(state => state.products.history);

    return (
        <div className='history'>
            <h1 className='page-title'>Истории операций</h1>
            {
                history[0] !== undefined
                    ?
                    <div className='history-box'>
                        {history.map((item, index) => {
                            return <HistoryItem type={item.type} desc={item.desc} date={item.date} key={index} />
                        })}
                    </div>
                    :
                    <div className='choose-error'>
                        <h2>Нет последних операций</h2>
                    </div>
            }
        </div>
    )
}

export default HistoryPage