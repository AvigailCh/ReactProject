import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user-list/user-list';
import UserDetails from './components/user-details/user-details';
import User from './models/User';

function App() {
  return (
    <UserList></UserList>
  );
}

export default App;
