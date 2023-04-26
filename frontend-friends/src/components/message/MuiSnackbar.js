import React from 'react'
import { Snackbar } from '@mui/material'
import './muiSnackbar.scss'

export default function MuiSnackbar (props) {
  return (
    <Snackbar
      className='mui-Snackbar '
      open={props.show}
      autoHideDuration={4000}
      onClose={() => props.onClose()}
      message='Nytt ärende skapad!'
    />
  )
}
