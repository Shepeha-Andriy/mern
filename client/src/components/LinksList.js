import React from "react";
import { Link } from 'react-router-dom'

export const LinksList = ({links}) => {
  if (!links.length) {
    return (<p className="center"> there are not links</p>)
  }
  
  return (
    <table>
        <thead>
          <tr>
              <th>N</th>
              <th>link</th>
              <th>new link</th>
              <th>open</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, i) => {
            return (
              <tr key={link._id}>
                <td>{i + 1}</td>
                <td>{ link.from }</td>
                <td>{ link.to }</td>
                <td><Link to={`/detail/${link._id}`}>open</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
  )
}