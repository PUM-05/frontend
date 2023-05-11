import React from 'react'
import { Snackbar } from '@mui/material'
import './succesSnackbar.scss'

export default function errorSnackbar (props) {
  return (
    <Snackbar
      open={props.show}
      autoHideDuration={4000}
      onClose={() => props.onClose()}
      message='Måste välja katergori också!'
    />
  )
}
