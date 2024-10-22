import React from 'react'
import '../styles/Card.css'


function Card({ticket, grouping, user}) {
  return (
    <div className='card'>
        <div className='card-header'>
            <div className='card-id'>{ticket.id}</div>
            {grouping === 'user' ? null : <div className='card-user'>
                <div className='card-user-icon'>{user.name.split(" ").map((n)=> n[0].toUpperCase()).join("")}</div>
                <div className={user.available ? 'active-user' : 'inactive-user'}></div>
            </div>} 
        </div>
        <div className='card-body'>
            {grouping === 'status' ? null : <img src={require('../assets/' + ticket.status + '.svg')}/>}
            
            <span>{ticket.title}</span>
        </div>
        <div className='card-footer'>
            {grouping === 'priority' ? null : <div className='card-footer-priority'><img src={require('../assets/' + ticket.priority + '.svg')} /></div>}
            
            <div className='card-footer-tags'>
                {ticket.tag.map((tag , index) => {
                    return( <div className='card-tag' key={index}>
                        <span></span>
                        <div>{tag}</div>
                    </div>)
                })}
            </div>
        </div>
    </div>
  )
}

export default Card