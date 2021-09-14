
import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  /// no 1
  const [data, setData] = useState({
    id: 3,
    name: 'Ronaldi'
  })

  //no 2
  const [data2, setData2] = useState('')
  const changeVal = e => {
    setData2(e.target.value)
  }
  const editData = () => {
    setData({ ...data, name: data2 })
  }

  //no3
  const [data3, setData3] = useState([])
  const GETAPI = () => {
    fetch(`http://jsonplaceholder.typicode.com/posts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        const data = response
        setData3(data.slice(0, 10))
        console.log(data, 'response, here')
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    GETAPI()
  }, [])

  //no5
  const deleteTable = i => {
    const reducedArr = [...data3]
    reducedArr.splice(i, 1)
    setData3(reducedArr)
  }
  const deleteDatatitle = i => {
    const updateArr = data3.map(p =>
      p.id === i
        ? {
            ...p,
            title: ''
          }
        : p
    )
    setData3(updateArr)
  }

  //no 9
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const changeSur = e => {
    setUsername(e.target.value)
  }
  const changePass = e => {
    setPassword(e.target.value)
  }

  const Login = () => {
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    window.location.reload();
  }
  const Logout = () => {
    localStorage.clear()
    window.location.reload();
  }

  const username2 = localStorage.getItem('username')
  const password2 = localStorage.getItem('password')

  return (
    <div className='App' style={{ padding: 20, paddingBottom: 150 }}>
      <h3>number 1, 2</h3>

      <div style={{ margin: 10 }}>
        <input type='text' onChange={e => changeVal(e)} />
        <button type='button' onClick={() => editData()}>
          change name
        </button>
      </div>

      <div>name: {data.name}</div>
      <hr />
      <br />
      <h3>number 4,5,6</h3>
      <table>
        <tr>
          <th>no</th>
          <th>title</th>
          <th>body</th>
          <th></th>
        </tr>
        {data3.map((elem, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>
              {elem.title}
              {elem.title !== '' && (
                <button type='button' onClick={() => deleteDatatitle(elem.id)}>
                  delete data
                </button>
              )}
            </td>
            <td>{elem.body}</td>
            <td>
              <button type='button' onClick={() => deleteTable(i)}>
                delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <br />
      <hr />
      <br />
      <h3>number 9</h3>
      <center>
        <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
          <input
            type='text'
            onChange={e => changeSur(e)}
            placeholder='username'
          />
          <br />
          <input
            type='password'
            onChange={e => changePass(e)}
            placeholder='username'
          />
          <br />
          <button type='button' onClick={() => Login()}>
            Login
          </button>
          <br />
          <br />
          {username2 &&password2 ? (
            <div>
              <button type='button' onClick={() => Logout()}>
                Logout
              </button>
              <div>
                <h3>selamat datang {username2} </h3>
              </div>
            </div>
          ) : null}
        </div>
      </center>
    </div>
  )
}

export default App
