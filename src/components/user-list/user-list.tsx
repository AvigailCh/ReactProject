import React, { FC } from 'react';
import './user-list.scss';
import apiService from '../../Services/api.service';
import { useRef, useState, useEffect } from 'react';
import Loadder from '../loadder/loadder';
import User from '../../models/User';
import UserDetails from '../user-details/user-details';
import { abort } from 'process';
import MyModal from '../my-modal/my-modal';
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
    const u = new User(a.id, a.name, a.username, a.email)
    Users.push(u);
    setUsers([...Users]);
    setUserDisplay([...Users])
  }

  const findUser = (event: any) => {
    if (UserDisplay != null) {
      UserDisplay.forEach(u => {
        UserDisplay.pop()
      })
    }
    UserDisplay.pop()
    Users.forEach(u => {
      if (u.username.includes(event.target.value)) {
        UserDisplay.push(u)
      }
    })
    setUserDisplay([...UserDisplay])
  }

  const deleteItem = (a: User) => {
    let ind = Users.indexOf(a);
    Users.splice(ind, 1)
    setUsers([...Users])
    setUserDisplay([...Users])
    apiService.deleteUser(a);
    // apiService.deleteUser(a).then((res) => {
    // }
  }


  return <div className="user-list">
    <input onBlur={(event) => findUser(event)} className="form-control m-1"></input><br></br>
    {isDisplay ? <Loadder title='data is load'></Loadder> : ''}
    {UserDisplay.map((a) => {
      return <div className='m-4'>
        <div className="card col-sm-4" >
          <div className="card-body">
            <h5 className="card-title">{a.username}</h5>
            <p className="card-text">{a.email}</p>
            {/* <button className='ms-2 btn btn-primary' onClick={() => { deleteItem(a) }}>delete item</button> */}
            <MyModal title='Are you sure you want to earaze this user?' func={() => {deleteItem(a)}}></MyModal>
          </div>
        </div>
      </div>
    })}
    <UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>
  </div>
}

export default UserList;
