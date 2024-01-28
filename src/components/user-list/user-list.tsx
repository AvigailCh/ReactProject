import React, { FC } from 'react';
import './user-list.scss';
import apiService from '../../Services/api.service';
import {useRef, useState, useEffect } from 'react';
import Loadder from '../loadder/loadder';
import User from '../../models/User';

interface UserListProps {
}


const UserList: FC<UserListProps> = () => {
  const [UsersList,setUsersList] = useState<any[]>([])
  const [UserDisplay,setUserDisplay] =useState<any[]>([])
  const [isDisplay, setIsDisplay] = useState(false)
  const [Users, setUsers] = useState<User[]>([])

  useEffect(() => {
    loadItems();
  }, [])

  const loadItems = () => {
    setIsDisplay(true)
    apiService.getListUsers().then((res) => {
      setUsersList(res.data.Users)
      UsersList.map((a) => {
        setUser(a)
        setUserDisplay([...a])
      })
      setIsDisplay(false)
    })
  }
  const setUser = (a: any) => {
    const u = new User(a.id, a.name, a.username, a.email)
    Users.push(u);
    setUsers(Users);
    setUserDisplay([...UserDisplay])
  }
  const findUser = (s: any) => {
    Users.forEach(u => {
      if (u.Name.includes(s))
        UserDisplay.push(u)
    })
    setUserDisplay([...UserDisplay])
  }
  return <div className="user-list">
    <input onBlur={(event)=>findUser(event)}className="form-control m-1"></input><br></br>
    {isDisplay ? <Loadder title='loadd data by axios'></Loadder> : ''}
    {UserDisplay.map((a) => {
      return <div className='m-4'>
        <div className="card col-sm-4" >
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">

            <h5 className="card-title">{a.UserName}</h5>
            <p className="card-text">{a.Email}</p>
            {/* <button className='ms-2 btn btn-primary' onClick={()=>{deleteItem(a.Link)}}>delete item</button> */}
          </div>
        </div>
      </div>
    })}
  </div>
}

export default UserList;
