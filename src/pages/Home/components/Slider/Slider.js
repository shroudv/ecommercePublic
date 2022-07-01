import React from 'react'
import { Link } from 'react-router-dom'

export default function Slider(props) {

  return (
    <div className={`slide${props.active ? ' active' : ''}`}>
      <img src={props.src}
        alt="" />
      <div className="contain content">
        <h2 className="slide-title">{props.title}</h2>
        <p>{props.content}</p>
        <Link to="/" className="btn btn-outline-light">Ətraflı</Link>
      </div>
    </div>
  )
}