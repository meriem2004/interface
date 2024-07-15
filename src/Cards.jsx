import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

function Cards({ totalApis, activatedApis, downApis, alerts }) {
  return (
    <div className='main-cards'>
      <div className='card'>
        <div className='card-inner'>
          <h3>Total APIs</h3>
          <BsFillArchiveFill className='card_icon' />
        </div>
        <h1>{totalApis}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>Activated APIs</h3>
          <BsFillGrid3X3GapFill className='card_icon' />
        </div>
        <h1>{activatedApis}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>Down APIs</h3>
          <BsPeopleFill className='card_icon' />
        </div>
        <h1>{downApis}</h1>
      </div>
      <div className='card'>
        <div className='card-inner'>
          <h3>Alerts</h3>
          <BsFillBellFill className='card_icon' />
        </div>
        <h1>{alerts}</h1>
      </div>
    </div>
  );
}

export default Cards;