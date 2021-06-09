import React from 'react'

const Notification = (props) => {
  if (!props.message) {
    return null
  }
  return (
    <div className={props.success ? "success" : "error"}>{props.message}</div>
  )
}

export default Notification