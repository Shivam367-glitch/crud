import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const PageNotFound = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className='pageContainer'>
     <div><h1>404</h1></div>
     <div><p>Oops..Looks like you get lost </p> </div>
     <div><Button variant='danger' onClick={()=>{navigate('/')}}>GO HOME</Button></div>
    </div>
    </>
  )
}

export default PageNotFound