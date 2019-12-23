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
      this.props.enqueueSnackbar('Cannot register user')
    }
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

          <form className="form">
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
          </form>
        </div>
      </Container>
    )
  }
}

export default withSnackbar(Register)
