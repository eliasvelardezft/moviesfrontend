import React, { Component } from 'react';

import { InputField, Button, Label } from '../../components';
import { post } from '../../functions';
import urls from '../../apiUrls';

import bg from '../../img/bg.jpg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogged: false,
    }
  }

  handleLogin = () => {
    let data = {
      'username': this.state.username,
      'password': this.state.password
    }
    

    post(urls.login, data, false)
      .then(resp => {
        if(resp.user.username) {

          localStorage.setItem('token', resp.token);
          localStorage.setItem('username', this.state.username);
          alert('successful login');

          this.setState({username: '', password:'', isLogged:true});
          this.props.history.push('/home');
        }
        else if(this.state.username === '' || this.state.password === '') {
          alert("Credenciales incompletas");
          this.setState({username: '', password:'', isLogged: false})
        }
        else {
          alert('Credenciales invalidas');
          this.setState({username: '', password:'', isLogged: false})
        }
      })
  }

  changeScreen = () => {
    this.props.history.push('/create-user/');
  }

  render() {
    return (
      <div style={{
        backgroundImage: `url(${bg})`,
      }}> 
        <div 
        className='flex flex-col h-screen items-center 
          backdrop-filter backdrop-blur-xl 
          bg-opacity-40 bg-no-repeat bg-cover relative'>
          <div>
          </div>
          <div className='flex flex-col relative my-auto items-center
            bg-clip-padding backdrop-filter backdrop-blur-xl 
            bg-opacity-40 border border-gray-200 bg-gray-100
            rounded-2xl p-4 h-3/6 max-w-md
            sm:w-2/4 sm:h-2/4 sm:rounded-3xl
            '>
              <Label className='mt-7'>Username</Label>
              <InputField placeholder='username'
                onChange={(e) => this.setState({username:e.target.value})}
              />

              <Label className='mt-7'>Password</Label>
              <InputField placeholder='password'
                onChange={(e) => this.setState({password:e.target.value})}
                type='password'
              />
              <Button onClick={this.handleLogin}
                className='mt-12'> 
                Log in
              </Button>
              <div className='flex flex-col items-center mt-16'>
                <p>You don't have an account?</p>
                <button onClick={this.changeScreen}>
                  Create one
                </button>
              </div>
              
          </div>
          <div className='mt-10 mb-8 text-xs absolute bottom-0
            sm:text-lg'>
            &copy; 2021 Elias Velardez
          </div>
      </div>
      </div>
      
    )
  }
}

export {
  Login
}