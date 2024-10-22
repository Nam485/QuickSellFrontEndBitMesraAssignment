import React from 'react';
import noPriority from '../assets/0.svg';
import low from "../assets/1.svg";
import medium from "../assets/2.svg";
import threeDot from "../assets/3 dot menu.svg";
import high from "../assets/3.svg";
import urgent from "../assets/4.svg";
import addIcon from "../assets/add.svg";
import '../styles/Title.css';

const priorityCode = {
    'No priority': noPriority,
    'Low': low,
    'Medium': medium,
    'High': high,
    'Urgent': urgent
}

function CardTitle({title, grouping, count, available = true}) {
  return (
    <div className='card-title'>
        <div className='card-title-left'>
            {grouping === 'user' ? 
            <div className='card-user'>
                <div className='card-user-icon'>{title.split(" ").map((n)=> n[0].toUpperCase()).join("")}</div>
                <div className={available ? 'active-user' : 'inactive-user'}></div>
            </div>
            : grouping === 'status' ? <img src={require(`../assets/${title}.svg`)} alt={title} /> 
            : grouping === 'priority' ? <img src={priorityCode[title]} /> : null}
          
            <span className='group-title'>{title}</span>
            <span className='group-count'>{count}</span>
        </div>
        {count > 0 ? <div className='card-title-right'>
            <button className='card-title-right-btn'><img src={addIcon}/></button>
            <button className='card-title-right-btn'><img src={threeDot}/></button>
        </div> : null}
    </div>
  )
}

export default CardTitle