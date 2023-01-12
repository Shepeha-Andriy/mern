import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      console.log(data)
      auth.login(data.token, data.userId)
    } catch (e) {
      
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>auth</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              
              <div className="input-field">
                <input 
                  placeholder="input email" 
                  id="email" 
                  type="email" 
                  className="validate yellow-input"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                ></input>
                <label htmlFor="email"></label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="input password" 
                  id="password" 
                  type="password" 
                  className="validate yellow-input"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                ></input>
                <label htmlFor="password"></label>
              </div>

            </div>
          </div>
          <div className="card-action">
            
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >sing in</button>
            
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >sing up</button>
          
          </div>
      </div>
      </div>
    </div>
  )
}
