import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const {request} = useHttp()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  
  const pressHandler = async(e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
        console.log(data)
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input 
            placeholder="input link" 
            id="link" 
            type="text" 
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          ></input>
          <label htmlFor="link"></label>
        </div>
      </div>
    </div>
  )
}