import React from 'react'
import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';


const Navbar = () => {
      const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='navbar'>
        <div className="wrapper">
            <div className="searchbar">
                <input type="text" placeholder='search...' />
                <SearchIcon/>
              

            </div>
            <div className="items">
                <div className="item">
                    <LanguageIcon className='icon'/><sub>English</sub>
                </div>
                <div className="item">
                    <DarkModeIcon className='icon' onClick={() => dispatch({ type: "TOGGLE" })}/>
                </div>
                <div className="item">
                    < FullscreenExitIcon  className='icon'/>
                </div>
                <div className="item">
                    <NotificationsIcon  className='icon'/>
                    <span className="counter">1</span>
                </div>
                 <div className="item">
                    <ChatBubbleIcon className='icon'/>
                     <span className="counter">1</span>
                </div>
                  <div className="item">
                    < FormatListBulletedIcon  className='icon'/>
                </div>
                 <div className="item">
                    <img src="/assets/avatar.jpeg" alt="avatar" className='avatar' />
                  
                </div>
            </div>
        </div>
    
        <hr />
    </div>
  
  )
}

export default Navbar