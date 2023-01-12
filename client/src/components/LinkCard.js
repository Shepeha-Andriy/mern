import React from "react";

export const LinkCard = ({link}) => {
  return (
    <div>
      <h2>link</h2>

      <p> ur link: <a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></p>
      <p> where: <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></p>
      <p> amount click: <strong>{link.clicks}</strong></p>
      <p> release date: <strong>{ new Date(link.date).toLocaleDateString()}</strong></p>

    </div>
  )
}