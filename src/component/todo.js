"use client"

import React, { useEffect, useState } from 'react'
import '../component/Todo.css'
const Page = () => {
  // const [data, setData] = useState(() => {
  //   const storedData = localStorage.getItem('user')
  //   return (storedData) ? JSON.parse(storedData) : []
  //   }
  // )
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [editIndex, setEditIndex] = useState(-1)
  const [search, setSearch] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user')
    const finalUser = user && JSON.parse(user)
    if (user) {
      setData(finalUser);
    }
  }, [])

  const handleChangeName = (value) => {
    setName(value)
  }

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleChangeSearch = (value) => {
    setSearch(value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = () => {

    if (name && email && password) {

      if (!validateEmail(email)) {
        alert("Invalid email format.")
        return
      }

      const currentDate = new Date().toLocaleString();
      // for local storage
      const payload = {
        name,
        email,
        password,
        date: currentDate
      }
      if (editIndex !== -1) {
        const newData = [...data];
        newData[editIndex] = payload;
        setData(newData);
        setEditIndex(-1);
      } else {
        //  setting up the actual data state
        setData((prev) => {
          return [...prev, payload]
        })  
      }
      setName("")
      setEmail("")
      setPassword("")

    } else {
      console.log("Fields are empty")
    }
    
  }

  const handleDel = (index) => {
    setData(data.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setName(data[index].name);
    setEmail(data[index].email);
    setPassword(data[index].password)
    setEditIndex(index);
  }
  
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.password.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(()=>{
    if (data.length === 0) {
      console.log("No data saved.")
      localStorage.setItem('user',JSON.stringify([]))
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user',JSON.stringify(data))
      console.log(data)
    }
  },[data])

  // useEffect(() => {
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  // }, [email, password]);
  
  return (
    <div className="container" >
      <div>
      <h1 className="heading">User Management</h1>
      <div className='input-details'>
        <input type="text" value={name} placeholder = 'Enter your Name' onChange={(e) => {
            handleChangeName(e.target.value)
          }} /> 
        <input type="text" value={email} placeholder = 'Enter your Email  - ex. @da.com' onChange={(e) => {
          handleChangeEmail(e.target.value)
        }} />
        <input type="text" value={password} placeholder = 'Enter your Password' onChange={(e) => {
          handleChangePassword(e.target.value)
        }} />
      </div>
      <button  className="button" onClick={handleSubmit}>
      {editIndex !== -1 ? 'Update' : 'Add'}
      </button>
      </div>
     

      <div className="subcontainer">
       <h2 className="subheading" >List of users</h2>
       <input
          type="text"
          value={search}
          placeholder="Search users"
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
       <ul className="list">
        {filteredData.map((item, index) => (
          <li className="listItem" key={index}>  
                <div className="userDetails">
                Date: {item?.date}<br/><br/>
                Name: {item?.name}<br/>
                Email: {item?.email}<br/>
                Password: {item?.password}
                </div>
                <div className="buttonContainer">
                  <button className="actionButton" onClick = {() => handleDel(index)}>Delete</button>
                  <button className="actionButton" onClick = {() => handleEdit(index)}>Edit</button>
                </div>

          </li>
        ))}
      </ul>
      </div>

    </div>
  )
}

export default Page