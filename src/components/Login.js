import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { withSnackbar } from 'notistack'

import '../styles/Login.css'
import auth from '../dataFetch/auth'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  errorMessages = {
    AUTH_MISMATCH_ERROR: 'Wrong username or password',
    INVALID_EMAIL_ADDRESS: 'Invalid email address',
    EMAIL_IS_REQUIRED: 'Email is required',
    PASSWORD_IS_REQUIRED: 'Password is required',
    UNKNOWN_LOGIN_ERROR: 'Cannot login user'
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.authenticateLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.username}
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
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.authenticateLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }

  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  authenticateLogin = async e => {
    e.preventDefault()
    try {
      const { email, password } = this.state

      let { data, statusCode } = await auth.loginUser(email, password)

      if (statusCode === 200) {
        auth.setToken(data.token)
        window.location.href = '/todos'
      }
    } catch ({ message }) {
      console.log(message)
      message = this.composeLoginErrorMessage(message)
      this.props.enqueueSnackbar(message)
    }
  }

  composeLoginErrorMessage = errorMessage => {
    if (errorMessage.match(/email or password un match/gi))
      return this.errorMessages.AUTH_MISMATCH_ERROR
    if (errorMessage.match(/email.*empty/gi))
      return this.errorMessages.EMAIL_IS_REQUIRED
    if (errorMessage.match(/password.*empty/gi))
      return this.errorMessages.PASSWORD_IS_REQUIRED
    else return this.errorMessages.UNKNOWN_LOGIN_ERROR
  }
}

export default withSnackbar(Login)
