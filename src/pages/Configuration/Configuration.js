import React, { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInput
  } from 'mdb-react-ui-kit';
import './Configuration.css'
import ShowDisplay from '../../components/ShowDisplay/ShowDisplay';
import Settings from '../../components/Settings/Settings';

const Configuration = () => {
  const [chatbotName, setChatbotName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [inputPlaceholder, setInputPlaceholder] = useState('');
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const handleChatbotNameChange = (e) => {
    setChatbotName(e.target.value);
  };

  const handleWelcomeMessageChange = (e) => {
    setWelcomeMessage(e.target.value);
  };

  const handleInputPlaceholderChange = (e) => {
    setInputPlaceholder(e.target.value);
  };

  const showGeneral = () => (
    <>
        <div>
        <label className='input-general' htmlFor="chatbotName">Chatbot Name</label>
        <MDBInput 
          type="text"
          id="chatbotName"
          value={chatbotName}
          onChange={handleChatbotNameChange}
        />
      </div>
      <div>
        <label className='input-general' htmlFor="welcomeMessage">Welcome Message</label>
        <MDBInput
          type="text"
          id="welcomeMessage"
          value={welcomeMessage}
          onChange={handleWelcomeMessageChange}
        />
      </div>
      <div>
        <label className='input-general' htmlFor="inputPlaceholder">Input Placeholder</label>
        <MDBInput
          type="text"
          id="inputPlaceholder"
          value={inputPlaceholder}
          onChange={handleInputPlaceholderChange}
        />
      </div>
    </>
  )

  return (
    <div>
        <nav className='Projects-nav'>
        <p className='tab-url'><svg width="44" height="44" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.0002 13.4116L36.8335 23.1616V40.0833H32.5002V27.0833H19.5002V40.0833H15.1668V23.1616L26.0002 13.4116ZM26.0002 7.58325L4.3335 27.0833H10.8335V44.4166H23.8335V31.4166H28.1668V44.4166H41.1668V27.0833H47.6668L26.0002 7.58325Z" fill="#7E22CE"/>
            </svg> / Sample Project / <span className='tab-upload'>Widget Configuration</span>
        </p>

        <svg width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.0001 58C34.9334 58 37.3334 55.6 37.3334 52.6667H26.6667C26.6667 55.6 29.0667 58 32.0001 58ZM48.0001 42V28.6667C48.0001 20.48 43.6534 13.6267 36.0001 11.8133V10C36.0001 7.78667 34.2134 6 32.0001 6C29.7867 6 28.0001 7.78667 28.0001 10V11.8133C20.3734 13.6267 16.0001 20.4533 16.0001 28.6667V42L10.6667 47.3333V50H53.3334V47.3333L48.0001 42ZM42.6667 44.6667H21.3334V28.6667C21.3334 22.0533 25.3601 16.6667 32.0001 16.6667C38.6401 16.6667 42.6667 22.0533 42.6667 28.6667V44.6667Z" fill="black"/>
        </svg>
      </nav>
      <h2 className='project-text-heading'>Configuration</h2>

      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            General
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Display
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Settings
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>{showGeneral()}</MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}><ShowDisplay/></MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}><Settings /></MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
};

export default Configuration;