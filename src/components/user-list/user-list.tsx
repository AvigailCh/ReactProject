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
  const [UserDisplay, setUserDisplay] = useState<any[]>([])
  const [isDisplay, setIsDisplay] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const nameRef = useRef<HTMLInputElement>(null);
  // const [Users, setUsers] = useState<User[]>([])

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
      setUserDisplay(res.data)
      // UsersList.map((a) => {
      //   setUser(a)
      // })
      setIsDisplay(false)
    })
  }
  const setUser = (a: any) => {
    const u = new User(a.id, a.name, a.username, a.email)
    UserDisplay.push(u);
    setUserDisplay([...UserDisplay])
    setUsersList([...UserDisplay])
  }

  const findUser = (event: any) => {
    // debugger
    // const item = event.target.value;
    // if(item)
    // {
    let searchValue = nameRef.current?.value;
    setUserDisplay(UsersList.filter((i) => i.username.includes(searchValue)))
    // }
    // else{
    //   setUserDisplay(UsersList)
    // }

    // if (UserDisplay != null) {
    //   UserDisplay.forEach(u => {
    //     UserDisplay.pop()
    //   })
    // }
    // UsersList.forEach(u => {
    //   if (u.username.includes(event.target.value)) {
    //     UserDisplay.push(u)
    //   }
    // })
    // setUserDisplay([...UserDisplay])
  }

  const deleteItem = (a: User) => {
    apiService.deleteUser(a).then((res) => {
      let ind = UsersList.indexOf(a);
      UsersList.splice(ind, 1)
      setUsersList([...UsersList])
      setUserDisplay([...UsersList])
    }, error => {

      setErrorMessage('error on delete item')
      loadItems()
      setTimeout(() => {
        setErrorMessage('')
      }, 1000)
    })
  }


  return <div className="user-list">
    <label htmlFor='search'>search</label>
    <input name='search' ref={nameRef} onChange={findUser} className="form-control m-1"></input><br></br>
    {isDisplay ? <Loadder title='data is load'></Loadder> : ''}
    {UserDisplay.map((a) => {
      return <div className='m-4'>
        <div className="card col-sm-4" >
          <div className="card-body">
            <h5 className="card-title">{a.username}</h5>
            <p className="card-text">{a.id}</p>
            <p className="card-text">{a.name}</p>
            <p className="card-text">{a.email}</p>
            <MyModal title='Are you sure you want to earaze this user?' func={() => { deleteItem(a) }}></MyModal>
          </div>
        </div>
      </div>
    })}
    <UserDetails funcParentAdd={addNewUser}>משתמש חדש</UserDetails>
  </div>
}

export default UserList;
