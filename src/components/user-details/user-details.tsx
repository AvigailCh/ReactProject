import React, { FC } from 'react';
import './user-details.scss';
import User from '../../models/User';
import { useFormik } from 'formik';
import * as Yup from 'yup'

interface UserDetailsProps { 
    funcParentAdd:(user: User)=>void
    children:React.ReactNode
}

const UserDetails: FC<UserDetailsProps> = (props:UserDetailsProps) => {
  const myForm=useFormik({
    initialValues: new User("Id", "Name", "UserName", "Email"),
    onSubmit: (valueForm: User) => {
      props.funcParentAdd(valueForm)
    },
    validationSchema: Yup.object().shape({
      Id: Yup.string().required(),
      Name: Yup.string().required(),
      UserName: Yup.string().required(),
      Email: Yup.string().required(),
    })
  })

  return <div className="user-details">
    <form onSubmit={myForm.handleSubmit} className='col-sm-6 '>
      <h2 className='mt-5'>{props.children}</h2>

      <div className='form-group mt-3'>
        <label>Id:</label>
        <input name='Id' value={myForm.values.Id} onChange={myForm.handleChange} className={myForm.errors.Id ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Id ? <small>{myForm.errors.Id}</small> : ''}
      </div>
      <div className='form-group mt-3'>
        <label>Name</label>
        <input name='Name' onChange={myForm.handleChange} className={myForm.errors.Name ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Name ? <small>{myForm.errors.Name}</small> : ''}
      </div>

      <div className='form-group mt-3'>
        <label>User Name</label>
        <input name='UserName' onChange={myForm.handleChange} className={myForm.errors.UserName ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.UserName ? <small>{myForm.errors.UserName}</small> : ''}

      </div>

      <div className='form-group mt-3'>
        <label>Email</label>
        <input name='Email' onChange={myForm.handleChange} className={myForm.errors.Email ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Email ? <small>{myForm.errors.Email}</small> : ''}

      </div>

      <button type='submit' className='btn btn-warning mt-5'>Add new User</button>

    </form>
  </div>
}

export default UserDetails;
