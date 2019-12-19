import React, { Component } from 'react'
import { CssBaseline, Avatar } from '@material-ui/core'
import { LockOpenOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import auth from '../dataFetch/auth'

import { withStyles } from '@material-ui/styles'
import { withSnackbar } from 'notistack'

const useStyles = theme => ({
  paper: {
    margin: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: '8dp',
    backgroundColor: '#e91e63'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '8dp'
  },
  submit: {
    margin: '6px 0px 4px'
  }
})

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

      let { data, statusCode } = await auth.registerUser(name, email, password)

      auth.setToken(data.token)
      window.location = '/todos'
    } catch ({ message }) {
      console.log(message)
    }
  }

  render() {
    const { classes } = this.props
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
              className={classes.submit}
              onClick={this.registerUser}
            >
              Register
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}

export default withSnackbar(withStyles(useStyles)(Register))
