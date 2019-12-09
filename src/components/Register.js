import React, { useState } from 'react'
import { CssBaseline, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOpenOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import authApi from '../dataFetch/authApi'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const initialValue = {
  username: '',
  password: ''
}

function Register() {
  const classes = useStyles()
  const [registerData, updateRegisterData] = useState(initialValue)

  const handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    updateRegisterData(prevLoginData => {
      return { ...prevLoginData, [inputId]: currentValue }
    })
  }

  const registerUser = async () => {
    const { username, password } = registerData

    let result = await authApi.register(username, password)

    if (result) {
      authApi.setToken(result.jwt_token)
      window.location = '/books'
    }
  }

  authApi.checkIfLoggedInAndSendToHome()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={handleChange}
            value={registerData.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            value={registerData.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
          >
            Register
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Register
