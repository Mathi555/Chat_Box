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

  // Fetch Data From Response JSON File Using Axios
  const handleChat = async () => {
    try {
      const result = await axios.post('http://localhost:5000/api/chat', { user_input: userInput });
      setResponses([...responses, { text: userInput, type: 'question' }, { text: result.data.response || "No response found.", type: 'answer' }]);
    } catch (error) {
      console.error('Error:', error.message);
    }
    setUserInput(''); // Clear the input after submitting the question
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
              {responses.map((response, index) => (
                <div key={index} className={`respo ${response.type}`}>
                  <span className='wbai'>{response.type === 'question' ? 'You' : 'Assist'} : </span><span className='respt'>{response.text}</span>
                  {!response.copied && response.type === 'answer' && (
                    <button onClick={() => handleCopyToClipboard(index)} className='copyButton'>
                      <IoCopy />
                    </button>
                  )}
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












// without link  code

// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Assuming App.css is in the same directory
// import { IoSendSharp } from "react-icons/io5";
// import { IoCopy } from "react-icons/io5";
// import { MdRefresh } from "react-icons/md";
// import { ImHtmlFive } from "react-icons/im";
// import { SiCss3 } from "react-icons/si";
// import { RiJavascriptFill } from "react-icons/ri";
// import { FaReact } from "react-icons/fa";
// import { SiMongodb } from "react-icons/si";
// import { IoMdHelp } from "react-icons/io";
// import { IoSettingsOutline } from "react-icons/io5";
// import { BsStars } from "react-icons/bs";

// function App() {
//   const [userInput, setUserInput] = useState('');
//   const [responses, setResponses] = useState([]);
//   const [collapsed, setCollapsed] = useState(false);

//   // Navbar 
//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const toggleNavbar = () => {
//     setCollapsed(!collapsed);
//   };

//   // Fetch Data From Response JSON File Using Axios
//   const handleChat = async () => {
//     try {
//       const result = await axios.post('http://localhost:5000/api/chat', { user_input: userInput });
//       setResponses([...responses, { text: userInput, type: 'question' }, { text: result.data.response || "No response found.", type: 'answer', google_links: result.data.google_links, wikipedia_data: result.data.wikipedia_data }]);
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//     setUserInput(''); // Clear the input after submitting the question
//   };

//   // Copy The Result In Clipboard 
//   const handleCopyToClipboard = (index) => {
//     const textToCopy = `Worldblack.Ai: ${responses[index].text}`;
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => {
//         let updatedResponses = [...responses];
//         updatedResponses[index].copied = true;
//         setResponses(updatedResponses);
//       })
//       .catch((err) => console.error('Error copying to clipboard:', err));
//   };

//   // Refresh Button To Clear The History
//   const handleClick = () => {
//     setUserInput('');
//     setResponses([]);
//   };

//   // Refresh Button Style
//   const feedStyle = {
//     marginLeft: '10px',
//     border: 'none',
//     fontSize: '20px',
//     backgroundColor: '#ecf0f1',
//   };

//   return (
//     <>
//       <div className='boo'>
//         <div className='round1'></div>
//         <div className={`left-navbar ${collapsed ? 'collapsed' : ''}`}>
//           <div className="toggle-icon" onClick={toggleNavbar}>
//             ☰
//           </div>
//           {!collapsed && (
//             <>
//               <h2 className='ain'>Worldblack.ai </h2>
//               <ul>
//                 <li>HTML5 <ImHtmlFive /></li>
//                 <li>CSS3 <SiCss3 /></li>
//                 <li>Java Script <RiJavascriptFill /></li>
//                 <li>React.js <FaReact /></li>
//                 <li>MongoDB <SiMongodb /></li>
//                 <li className='ve'>Worldblack 1.0</li>
//                 <li className='sett' >Help <IoMdHelp /></li>
//                 <li className='sett'>Settings <IoSettingsOutline /></li>
//                 <li className='sett'>Upgrade Plan 2.0 <BsStars /></li>
//               </ul>
//             </>
//           )}
//         </div>

//         <div className='back'>
//           <div className='round2'>
//             <p className='round2'>Ai</p>
//           </div>
//           <h1 className='hell'>Hello,</h1>
//           <div>
//             <p className='hci'>How can I help you ! <BsStars /></p>
//             <div>
//               <input type="text" value={userInput} onChange={handleInputChange} placeholder='search here !' className='inputfiled' />
//               <p onClick={handleChat} className='searchbut'><IoSendSharp /></p>
//             </div>
//             <div className='mmm'>
//               {responses.map((response, index) => (
//                 <div key={index} className={`respo ${response.type}`}>
//                   <span className='wbai'>{response.type === 'question' ? 'You' : 'Worldblack.Ai'}: {response.text}</span>
//                   {response.google_links && (
//                     <ul>
//                       {response.google_links.map((link, i) => (
//                         <li key={i}><a href={link} target="_blank" rel="noopener noreferrer">Google Link {i + 1}</a></li>
//                       ))}
//                     </ul>
//                   )}
//                   {response.wikipedia_data && (
//                     <p>{response.wikipedia_data}</p>
//                   )}
//                   {response.type === 'answer' && (
//                     <IoCopy onClick={() => handleCopyToClipboard(index)} className={`copier ${response.copied ? 'copied' : ''}`} />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="refresh" style={feedStyle} onClick={handleClick}><MdRefresh /></div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
