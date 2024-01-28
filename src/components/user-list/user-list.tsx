import React, { FC } from 'react';
import './user-list.scss';
import apiService from '../../Services/api.service';
import { useRef, useState, useEffect } from 'react';
import Loadder from '../loadder/loadder';
import User from '../../models/User';
import UserDetails from '../user-details/user-details';
interface UserListProps {
}


const UserList: FC<UserListProps> = () => {
  const [UsersList, setUsersList] = useState<any[]>([])
  const [UserDisplay, setUserDisplay] = useState<User[]>([])
  const [isDisplay, setIsDisplay] = useState(false)
  const [Users, setUsers] = useState<User[]>([])
  const addNewUser = (user: User) => {
    setUser(user)
  }

  useEffect(() => {
    loadItems();
  }, [])

  const loadItems = () => {
    setIsDisplay(true)
    apiService.getListUsers().then((res) => {
      setUsersList(res.data)
      UsersList.map((a) => {
        setUser(a)
      })
      setIsDisplay(false)
    })
  }
  const setUser = (a: any) => {
    const u = new User(a.Id, a.Name, a.UserName, a.Email)
    Users.push(u);
    setUsers([...Users]);
    setUserDisplay([...Users])
  }

  const findUser = (event: any) => {
    if(UserDisplay!=null)
    {
      UserDisplay.forEach(u=>{
        UserDisplay.pop()
      })
    }
    UserDisplay.pop()
     Users.forEach(u => {
      if (u.UserName.includes(event.target.value)) {
        UserDisplay.push(u)
      }
    })
      setUserDisplay([...UserDisplay])
  }
return <div className="user-list">
  <input onBlur={(event) => findUser(event)} className="form-control m-1"></input><br></br>
  {isDisplay ? <Loadder title='data is load'></Loadder> : ''}
  {UserDisplay.map((a) => {
    return <div className='m-4'>
      <div className="card col-sm-4" >
        <img className="card-img-top" src="..." alt="my image" />
        <div className="card-body">
          <h5 className="card-title">{a.UserName}</h5>
          <p className="card-text">{a.Email}</p>
          {/* <button className='ms-2 btn btn-primary' onClick={()=>{deleteItem(a.Link)}}>delete item</button> */}
        </div>
      </div>
    </div>
  })}
  <UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>
</div>
}

export default UserList;
