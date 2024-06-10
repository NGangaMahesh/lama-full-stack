import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext.js';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import './Login.css'
import axios from 'axios';

function Login() {
  if (localStorage.getItem('token')){
    window.location.href = '/';
  }
    const [currentTab, setCurrentTab] = useState("login");
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
      })
      const {url, setToken} = useContext(StoreContext);

      
      const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
      }
  
      const onLogin = async(event) => {
        event.preventDefault()
        let newUrl = url;
        if (currentTab === 'login'){
          newUrl += '/user/login'
        }
        else{
          newUrl += '/user/register'
        }
        console.log(newUrl);
  
        const response = await axios.post(newUrl, data)
        if (response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        }
        else{
          alert(response.data.message)
        }
      }
  

  return (
    <MDBContainer fluid className='login-page'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <form onSubmit={onLogin} className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}} >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100' >

              <h2 className="fw-bold mb-2 text-uppercase">{currentTab === 'login' ?  'Login' : 'Register'}</h2>
              <p className="text-white-50 mb-5">{currentTab === 'login' ? 'Please enter your login and password!':  'Please enter your details!'}</p>


              {currentTab === 'login' ?  
                <></>:(<MDBInput name='name' onChange={onChangeHandler} value={data.name} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Name' id='formControlLg' type='string' size="lg" required/>)
                }
              <MDBInput name='email' onChange={onChangeHandler} value={data.email} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" required/>
              <MDBInput name='password' onChange={onChangeHandler} value={data.password} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" required/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
              {currentTab === 'login' ? 
                <p className="mb-0">Don't have an account? <button className="text-white-50 fw-bold login-btn" type='submit' onClick={() => setCurrentTab('signup')}>Sign Up</button></p> :
                <p className="mb-0">Already have an account? <button className="text-white-50 fw-bold login-btn" type='submit' onClick={() => setCurrentTab('login')}>Login</button></p>
              }

              </div>
            </MDBCardBody>
          </form>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;