import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
      <Link to='/' style={{textDecoration:'none'}}><h1 className='m'><i className="fa-solid fa-film"></i>Movies</h1></Link>
      <Link to='/favourites' style={{textDecoration:'none'}}><h4 className='f'>Favourites</h4></Link>
          
      </div>
    )
  }
}
