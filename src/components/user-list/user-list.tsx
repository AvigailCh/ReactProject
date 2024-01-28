import React, { FC } from 'react';
import './user-list.scss';
import apiService from '../../Services/api.service';
import { useState, useEffect } from 'react';
import Loadder from '../loadder/loadder';
import User from '../../models/User';
import UserDetails from '../user-details/user-details';

interface UserListProps {
}


const UserList: FC<UserListProps> = () => {
  const [UsersList, setUsersList] = useState<any[]>([])
  const [isDisplay, setIsDisplay] = useState(false)
  const [Users, setUsers] = useState<User[]>([])


  const addNewUser = (user: User) => {
    Users.push(user);
    setUsers([...Users])
  }


  useEffect(() => {
    loadItems();
  }, [])

  const loadItems = () => {
    setIsDisplay(true)
    apiService.getListUsers().then((res) => {
      setUsersList(res.data.Users)
      UsersList.map((a) => {
        setUser(a)
      })
      setIsDisplay(false)
    })
  }
  const setUser = (a: any) => {
    const u = new User(a.id, a.name, a.username, a.email)
    Users.push(u);
    setUsers([...Users]);
  }

  return <div className="user-list">
    {isDisplay ? <Loadder title='loadd data by axios'></Loadder> : ''}
    {Users.map((a) => {
      debugger
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
    <div className='col-sm-6'>
      <UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>
    </div>
  </div>
}

export default UserList;
