import React, { Component } from 'react';

import { Button, InputField, Label } from '../../components';
import { post } from '../../functions';
import urls from '../../apiUrls';

import bg from '../../img/bg.jpg';


class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
    }
  }

  handleCreateUser = () => {
    let data = {
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password,
      movies_watchlist: []
    }
    
    post(urls.usersUrl, data, false)
      .then(res => {
        if(res.code === 'ok') {
          alert('User created successfully');
          this.props.history.push('/');
        }
        else {
          alert('Error creating user');
        }
      })
  }

  changeScreen = () => {
    this.props.history.push('/');
  }

  render() {
    return(
      <div style={{
        backgroundImage: `url(${bg})`,
      }}
        className='flex flex-col h-screen items-center 
          backdrop-filter backdrop-blur-xl 
          bg-opacity-40 bg-no-repeat bg-cover relative'>
        <div>
        </div>
        <div className='flex flex-col absolute items-center
          bg-clip-padding backdrop-filter backdrop-blur-xl 
          bg-opacity-40 border border-gray-200 bg-gray-100
          rounded-2xl px-4 h-2/3 top-28 max-w-md
          sm:w-3/4 sm:h-3/4 sm:top-36 sm:rounded-3xl
          xl:top-32
          '>
            <Label className='mt-8'>First name</Label>
            <InputField placeholder='Lionel'
                className='sm:h-4'
                onChange={(e) => this.setState({firstName: e.target.value})}
            />

            <Label className='mt-8'>Last name</Label>
            <InputField placeholder='Messi'
              className=''
              onChange={(e) => this.setState({lastName:e.target.value})}
              />
            
            <Label className='mt-8'>Username</Label>
            <InputField placeholder='liomessi'
              className=''
              onChange={(e) => this.setState({username:e.target.value})}
              />

            <Label className='mt-8'>Password</Label>
            <InputField type="password"
              className=''
              onChange={(e) => this.setState({password:e.target.value})}
            />
            <Button className='mt-8' color='rgb(167, 139, 250)' onClick={this.handleCreateUser}> 
              Create
            </Button>
            <div className='flex flex-col mt-10'>
                <label>You already have an account?</label>
                <button onClick={this.changeScreen}>
                  Log in
                </button>
            </div>
        </div>
        <div className='mt-10 mb-8 text-xs absolute bottom-0
          sm:text-lg'>
          &copy; 2021 Elias Velardez
        </div>
      </div>
    )
  }
}

export default CreateUser;