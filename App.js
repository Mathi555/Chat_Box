import React, { useState } from 'react';
import axios from 'axios';
import '../src/App.css';
import { IoSendSharp } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";

function App() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  // Navbar 
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  // Copy The Result In Clipboard 
  const handleCopyToClipboard = (index) => {
    const textToCopy = `Worldblack.Ai: ${responses[index].text}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        let updatedResponses = [...responses];
        updatedResponses[index].copied = true;
        setResponses(updatedResponses);
      })
      .catch((err) => console.error('Error copying to clipboard:', err));
  };

  // Refresh Button To Clear The History
  const handleClick = () => {
    setUserInput('');
    setResponses([]);
  };

  // Trigger search when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  // Refresh Button Style
  const feedStyle = {
    marginLeft: '10px',
    border: 'none',
    fontSize: '20px',
    backgroundColor: '#070A18',
  };

  return (
    <>
      <div className='boo'>
        <div className='round1'></div>
        <div className={`left-navbar ${collapsed ? 'collapsed' : ''}`}>
          <div className="toggle-icon" onClick={toggleNavbar}>
            ☰
          </div>
          {!collapsed && (
            <>
              <h2 className='ain'>Assist </h2>
              <ul>
                <li className='ve' >Help <IoMdHelp /></li>
                <li className='sett'>Settings <IoSettingsOutline /></li>
                <li className='sett'>Upgrade Plan <BsStars /></li>
              </ul>
            </>
          )}
        </div>

        <div className='back'>
          <div className='round2'>
            <p className='round2'>Ai</p>
          </div>
          <h1 className='hell'>Hello,</h1>
          <div>
            <p className='hci'>How can I help you ! <span className='gll'><BsStars /></span></p>
            <div>
              <input type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder='search here !' className='inputfiled' />
              <p onClick={handleChat} className='searchbut'><IoSendSharp /></p>
            </div>
            <div className='mmm'>
                  {response.type === 'answer' && (
                    <BiSolidLike className='fbb' />
                  )}
                </div>
              ))}
              {responses.length > 0 && (
                <button style={feedStyle} onClick={handleClick}>
                  <MdRefresh className='fbb' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
