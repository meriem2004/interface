import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsGraphDown } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src='/images/procheck-logo.png' alt='Procheck Logo' className='icon_header' />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/api-monitoring-table">
            <BsFillArchiveFill className='icon' /> API monitoring table
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/downtime-chart">
            <BsGraphDown className='icon' /> Downtime chart
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;