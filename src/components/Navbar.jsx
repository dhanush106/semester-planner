import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li><Link className='l' to="/">Dashboard</Link></li>
        <li><Link className='l' to="/subjects">Subjects</Link></li>
        <li><Link className='l' to="/stopwatch">StopWatch</Link></li>
        <li><Link className='l' to="/schedule">Scheduler</Link></li>
      </ul>
    </div>
  )
}

export default Navbar;
