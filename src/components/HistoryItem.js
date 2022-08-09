import React from 'react'

function HistoryItem({ type, desc, date }) {
    let descArr = desc.split(/;\s/g)
    return (
        <div className='history-item'>
            <h3>{type}</h3>
            {
                descArr.map(
                    (item, index) => {
                        return <p key={index}>{item}</p>
                    })
            }
            <p>{date}</p>
        </div>
    )
}

export default HistoryItem