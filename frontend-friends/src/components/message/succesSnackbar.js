import React from 'react'
import { Snackbar } from '@mui/material'
import './succesSnackbar.scss'

export default function succesSnackbar (props) {
  return (
    <Snackbar
      className='succes-Snackbar '
      open={props.show}
      autoHideDuration={4000}
      onClose={() => props.onClose()}
      message='Nytt ärende skapad!'
    />
  )
}
