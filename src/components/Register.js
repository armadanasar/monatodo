import React, { Component } from 'react'
import { CssBaseline, Avatar } from '@material-ui/core'
import { LockOpenOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { withSnackbar } from 'notistack'

import '../styles/Register.css'
import auth from '../dataFetch/auth'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  errorMessages = {
    INVALID_EMAIL_ADDRESS: 'Invalid email address',
    EMAIL_IS_REQUIRED: 'Email is required',
    NAME_IS_REQUIRED: 'Name is required',
    PASSWORD_IS_REQUIRED: 'Password is required',
    UNKNOWN_REGISTER_ERROR: 'Cannot register user'
  }

  render() {
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <div className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={this.handleChange}
              value={this.state.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
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
              onChange={this.handleChange}
              value={this.state.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.registerUser}
            >
              Register
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    this.setState({ [inputId]: currentValue })
  }

  registerUser = async () => {
    try {
      const { name, email, password } = this.state

      let { data } = await auth.registerUser(name, email, password)

      auth.setToken(data.token)
      window.location = '/todos'
    } catch ({ message }) {
      console.log(message)
      message = this.composeRegisterErrorMessage(message)
      this.props.enqueueSnackbar(message)
    }
  }

  composeRegisterErrorMessage = errorMessage => {
    if (errorMessage.match(/must be a valid email/gi))
      return this.errorMessages.INVALID_EMAIL_ADDRESS
    if (errorMessage.match(/name.*empty/gi))
      return this.errorMessages.NAME_IS_REQUIRED
    if (errorMessage.match(/email.*empty/gi))
      return this.errorMessages.EMAIL_IS_REQUIRED
    if (errorMessage.match(/password.*empty/gi))
      return this.errorMessages.PASSWORD_IS_REQUIRED
    else return this.errorMessages.UNKNOWN_REGISTER_ERROR
  }
}

export default withSnackbar(Register)
