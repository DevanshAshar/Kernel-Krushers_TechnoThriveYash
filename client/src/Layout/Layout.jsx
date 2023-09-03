import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast'
const Layout = (props) => {
  return (
    <>
    <Header/>
    <main style={{minHeight:'80vh'}}>
      <Toaster/>
    {props.children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout