import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';


const myAPI = "api7dcb2768"
const path = '/users'; 

const App = () => {
  const [input, setInput] = useState("")
  const [users, setUsers] = useState([])

  //Function to fetch from our backend and update user array
  function getUser(e) {
    let userID = e.input
    API.get(myAPI, path + "/" + userID)
       .then(response => {
         console.log(response)
         let newUsers = [...users]
         newUsers.push(response)
         setUsers(newUsers)

       })
       .catch(error => {
         console.log(error)
       })
  }

  return (
    
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
          <input placeholder="user id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getUser({input})}>Get User From Backend</button>

      <h2 style={{visibility: users.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       users.map((thisUser, index) => {
         return (
        <div key={thisUser.userID}>
          <span><b>UserID:</b> {thisUser.userID} - <b>UserName</b>: {thisUser.userName}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;
