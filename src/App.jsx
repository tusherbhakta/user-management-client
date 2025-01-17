
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then( res => res.json())
    .then(data => setUsers(data));
  },[])

  const handleAddUsers = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email};
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then( data => {
      console.log('inside post response', data);
      const newUsers = [...users, data]
      setUsers(newUsers);
      form.reset();
    } )
  }

  return (
    <>
      <h1>User Management Client</h1>
      <p>Number of users: {users.length}</p>
      <form onSubmit={handleAddUsers}>
        <input type="text" name='name' placeholder='Name' />
        <br />
        <input type="email" name='email' placeholder='email' />
        <br />
        <input type="submit" value='Add Users' />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email} </p>)
        }
      </div>
    </>
  )
}

export default App
