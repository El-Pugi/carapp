import './App.css'
import React from 'react'
import Carlist from './components/Carlist'
import { AppBar, Typography } from '@mui/material'

function App() {
  return (
    <>
    <AppBar position='static'>
      <Typography variant='h6' textAlign={'center'}>
        Car Shop
      </Typography>
    </AppBar>
     <Carlist/>
    </>
  )
}

export default App


